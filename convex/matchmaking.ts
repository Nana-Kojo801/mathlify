import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { api } from './_generated/api'
import { type MutationCtx } from './_generated/server'
import type { Doc } from './_generated/dataModel'

export const startSearch = mutation({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    // Check if user already has an active match
    const activeMatch = await ctx.db
      .query('rapidOnlineMatches')
      .filter((q) =>
        q.and(
          q.or(
            q.eq(q.field('player1Id'), userId),
            q.eq(q.field('player2Id'), userId),
          ),
        ),
      )
      .first()

    if (activeMatch) return activeMatch

    // Check if user is already in queue
    const userInQueue = await ctx.db
      .query('rapidOnlineQueue')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .unique()

    const now = Date.now()
    const maxWaitTime = 30000 // 30 seconds

    if (!userInQueue) {
      // Add user to queue
      await ctx.db.insert('rapidOnlineQueue', {
        isSearching: true,
        joinedAt: now,
        userId,
        maxWaitTime,
      })
    } else {
      // Update existing queue entry
      await ctx.db.patch(userInQueue._id, {
        isSearching: true,
        joinedAt: now,
        maxWaitTime,
      })
    }

    // Schedule immediate matchmaking attempt
    await ctx.scheduler.runAfter(0, api.matchmaking.processMatchmaking, { userId })
    
    // Schedule periodic matchmaking attempts
    await ctx.scheduler.runAfter(2000, api.matchmaking.processMatchmaking, { userId })
    await ctx.scheduler.runAfter(5000, api.matchmaking.processMatchmaking, { userId })
    await ctx.scheduler.runAfter(10000, api.matchmaking.processMatchmaking, { userId })
    
    // Schedule timeout cleanup
    await ctx.scheduler.runAfter(maxWaitTime, api.matchmaking.cleanupExpiredQueue, { userId })
  },
})

export const processMatchmaking = mutation({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db.get(userId)
    if (!user) return

    // Check if user is still in queue and searching
    const userInQueue = await ctx.db
      .query('rapidOnlineQueue')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .unique()

    if (!userInQueue || !userInQueue.isSearching) return

    // Check if user already has a match (might have been matched by another process)
    const activeMatch = await ctx.db
      .query('rapidOnlineMatches')
      .filter((q) =>
        q.and(
          q.or(
            q.eq(q.field('player1Id'), userId),
            q.eq(q.field('player2Id'), userId),
          ),
        ),
      )
      .first()

    if (activeMatch) {
      // Remove from queue since they have a match
      await ctx.db.delete(userInQueue._id)
      return
    }

    // Find potential opponents
    const potentialOpponents = await ctx.db
      .query('rapidOnlineQueue')
      .filter((q) =>
        q.and(
          q.neq(q.field('userId'), userId),
          q.eq(q.field('isSearching'), true),
        ),
      )
      .collect()

    if (potentialOpponents.length === 0) return

    // Find best opponent based on ELO difference
    let bestOpponent = null
    let bestOpponentEntry = null
    let closestEloDiff = Infinity

    for (const opponentEntry of potentialOpponents) {
      const opponent = await ctx.db.get(opponentEntry.userId)
      if (!opponent) continue

      const eloDiff = Math.abs(opponent.elo.rapid - user.elo.rapid)
      if (eloDiff < closestEloDiff) {
        closestEloDiff = eloDiff
        bestOpponent = opponent
        bestOpponentEntry = opponentEntry
      }
    }

    // Try to create match with best opponent
    if (bestOpponent && bestOpponentEntry) {
      await createRapidMatchAtomic(
        ctx,
        { user, entry: userInQueue },
        { user: bestOpponent, entry: bestOpponentEntry },
      )
    }
  },
})

export const cleanupExpiredQueue = mutation({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    const userInQueue = await ctx.db
      .query('rapidOnlineQueue')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .unique()

    if (!userInQueue) return

    const waitTime = Date.now() - userInQueue.joinedAt
    if (waitTime >= userInQueue.maxWaitTime) {
      await ctx.db.patch(userInQueue._id, { isSearching: false })
    }
  },
})

export const stopSearch = mutation({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    const userInQueue = await ctx.db
      .query('rapidOnlineQueue')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .unique()

    if (userInQueue) {
      await ctx.db.patch(userInQueue._id, { isSearching: false })
    }
  },
})

export const findActiveMatch = query({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    const activeMatch = await ctx.db
      .query('rapidOnlineMatches')
      .filter((q) =>
        q.and(
          q.or(
            q.eq(q.field('player1Id'), userId),
            q.eq(q.field('player2Id'), userId),
          ),
        ),
      )
      .first()

    if (!activeMatch) return null

    const [player1, player2] = await Promise.all([
      ctx.db.get(activeMatch.player1Id!),
      ctx.db.get(activeMatch.player2Id!),
    ])

    if (!player1 || !player2) return null

    return {
      ...activeMatch,
      player1: {
        username: player1.username,
        avatar: player1.avatar,
        elo: player1.elo.rapid,
      },
      player2: {
        username: player2.username,
        avatar: player2.avatar,
        elo: player2.elo.rapid,
      },
    }
  },
})

// Atomic match creation helper
interface Player {
  user: Doc<'users'>
  entry: Doc<'rapidOnlineQueue'>
}

const createRapidMatchAtomic = async (
  ctx: MutationCtx,
  player1Data: Player,
  player2Data: Player,
) => {
  try {
    // Double-check both players are still available and searching
    const [currentUser1Entry, currentUser2Entry] = await Promise.all([
      ctx.db.get(player1Data.entry._id),
      ctx.db.get(player2Data.entry._id),
    ])

    if (!currentUser1Entry?.isSearching || !currentUser2Entry?.isSearching) {
      return null
    }

    // Create the match
    const now = Date.now()
    const matchId = await ctx.db.insert('rapidOnlineMatches', {
      player1Id: player1Data.user._id,
      player2Id: player2Data.user._id,
      status: 'waiting',
      gamePhase: {
        type: 'waiting',
        startTime: now,
        endTime: now + 5000,
      },
      gameResult: {
        player1: 0,
        player2: 0,
      },
    })

    // Schedule game phases
    await ctx.scheduler.runAfter(5000, api.matchmaking.startRapidCountdown, {
      matchId,
    })

    // Remove both players from queue atomically
    await Promise.all([
      ctx.db.delete(player1Data.entry._id),
      ctx.db.delete(player2Data.entry._id),
    ])

    return matchId
  } catch (error) {
    console.error('Failed to create rapid match:', error)
    return null
  }
}

// Keep your existing game phase mutations
export const startRapidCountdown = mutation({
  args: { matchId: v.id('rapidOnlineMatches') },
  handler: async (ctx, { matchId }) => {
    const match = await ctx.db.get(matchId)
    if (!match || match.status === 'countdown') return

    const now = Date.now()
    await ctx.db.patch(matchId, {
      status: 'countdown',
      gamePhase: {
        type: 'countdown',
        startTime: now,
        endTime: now + 3000,
      },
    })

    await ctx.scheduler.runAfter(3000, api.matchmaking.startRapidQuestions, {
      matchId,
    })
  },
})

export const startRapidQuestions = mutation({
  args: { matchId: v.id('rapidOnlineMatches') },
  handler: async (ctx, { matchId }) => {
    const match = await ctx.db.get(matchId)
    if (!match || match.status === 'questions') return

    const now = Date.now()
    await ctx.db.patch(matchId, {
      status: 'questions',
      gamePhase: {
        type: 'questions',
        startTime: now,
        endTime: now + 60000,
      },
    })

    await ctx.scheduler.runAfter(60000, api.matchmaking.startRapidResult, {
      matchId,
    })
  },
})

export const startRapidResult = mutation({
  args: { matchId: v.id('rapidOnlineMatches') },
  handler: async (ctx, { matchId }) => {
    const match = await ctx.db.get(matchId)
    if (!match || match.status === 'result') return

    await ctx.db.patch(matchId, {
      status: 'result',
      gamePhase: {
        type: 'result',
        startTime: Date.now(),
        endTime: 0,
      },
    })
  },
})

export const updateRapidResult = mutation({
  args: {
    matchId: v.id('rapidOnlineMatches'),
    userId: v.id('users'),
    score: v.number(),
  },
  handler: async (ctx, { matchId, userId, score }) => {
    const match = await ctx.db.get(matchId)
    if (!match) throw new Error('Match not found')

    const updatedResult = { ...match.gameResult }
    
    if (match.player1Id === userId) {
      updatedResult.player1 = score
    } else if (match.player2Id === userId) {
      updatedResult.player2 = score
    }

    await ctx.db.patch(matchId, {
      gameResult: updatedResult,
    })
  },
})

export const deleteRapidMatch = mutation({
  args: { matchId: v.id('rapidOnlineMatches') },
  handler: async (ctx, { matchId }) => {
    const match = await ctx.db.get(matchId)
    if (!match) return
    await ctx.db.delete(matchId)
  },
})