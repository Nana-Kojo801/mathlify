import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import type { Id } from './_generated/dataModel'

export const create = mutation({
  handler: async (ctx) => {
    const previousCompetition = await ctx.db.query('competitions').first()
    if (previousCompetition) {
      await ctx.db.patch(previousCompetition._id, {
        expired: true
      })
    }
    await ctx.db.insert('competitions', {
      endTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week from now
      resultViews: [],
      expired: false,
    })
  },
})

export const getFlowEntries = query({
  args: { competitionId: v.optional(v.id('competitions')) },
  handler: async (ctx, { competitionId }) => {
    let id = competitionId
    if (!competitionId) {
      const currentCompetition = await ctx.db.query('competitions').first()
      if (!currentCompetition) return []
      id = currentCompetition._id
    }
    const flowEntries = await ctx.db
      .query('flowCompetitionEntries')
      .withIndex('by_competition', (q) => q.eq('competitionId', id!))
      .collect()

    return (
      await Promise.all(
        flowEntries.map(async (entry) => {
          const user = (await ctx.db.get(entry.userId))!
          const { _id, _creationTime, competitionId, ...actualEntry } = entry
          return {
            username: user.username,
            avatar: user.avatar,
            ...actualEntry,
          }
        }),
      )
    ).sort((a, b) => b.score - a.score)
  },
})

export const getRapidEntries = query({
  args: { competitionId: v.optional(v.id('competitions')) },
  handler: async (ctx, { competitionId }) => {
    let id = competitionId
    if (!competitionId) {
      const currentCompetition = await ctx.db.query('competitions').first()
      if (!currentCompetition) return []
      id = currentCompetition._id
    }
    const flowEntries = await ctx.db
      .query('rapidCompetitionEntries')
      .withIndex('by_competition', (q) => q.eq('competitionId', id!))
      .collect()

    return (
      await Promise.all(
        flowEntries.map(async (entry) => {
          const user = (await ctx.db.get(entry.userId))!
          const { _id, _creationTime, competitionId, ...actualEntry } = entry
          return {
            username: user.username,
            avatar: user.avatar,
            ...actualEntry,
          }
        }),
      )
    ).sort((a, b) => b.score - a.score)
  },
})

export const getFlowEntry = query({
  args: {
    userId: v.id('users'),
    competitionId: v.optional(v.id('competitions')),
  },
  handler: async (ctx, { userId, competitionId }) => {
    const user = (await ctx.db.get(userId))!
    const defaultEntry = {
      userId: user._id,
      username: user.username,
      avatar: user.avatar,
      score: 0,
      avgTime: 0,
      round: 0,
      rank: 0,
    }

    if (!competitionId) return defaultEntry
    const userEntry = await ctx.db
      .query('flowCompetitionEntries')
      .withIndex('by_competition', (q) => q.eq('competitionId', competitionId))
      .filter((q) => q.eq(q.field('userId'), userId))
      .unique()

    if (!userEntry) return defaultEntry

    const rank =
      (
        await ctx.db
          .query('flowCompetitionEntries')
          .withIndex('by_competition', (q) =>
            q.eq('competitionId', competitionId),
          )
          .collect()
      )
        .sort((a, b) => b.score - a.score)
        .findIndex((entry) => entry.userId === userId) + 1
    const { _id, _creationTime, competitionId: compId, ...entry } = userEntry

    return { ...entry, username: user.username, avatar: user.avatar, rank }
  },
})

export const getRapidEntry = query({
  args: {
    userId: v.id('users'),
    competitionId: v.optional(v.id('competitions')),
  },
  handler: async (ctx, { userId, competitionId }) => {
    const user = (await ctx.db.get(userId))!
    let id = competitionId
    const defaultEntry = {
      userId: user._id,
      username: user.username,
      avatar: user.avatar,
      score: 0,
      avgTime: 0,
      questions: 0,
      rank: 0,
    }
    if (!competitionId) {
      const currentCompetition = await ctx.db.query('competitions').first()
      if (!currentCompetition) return defaultEntry
      id = currentCompetition._id
    }
    const userEntry = await ctx.db
      .query('rapidCompetitionEntries')
      .withIndex('by_competition', (q) => q.eq('competitionId', id!))
      .filter((q) => q.eq(q.field('userId'), userId))
      .unique()

    if (!userEntry) return defaultEntry

    const rank =
      (
        await ctx.db
          .query('rapidCompetitionEntries')
          .withIndex('by_competition', (q) => q.eq('competitionId', id!))
          .collect()
      )
        .sort((a, b) => b.score - a.score)
        .findIndex((entry) => entry.userId === userId) + 1
    const { _id, _creationTime, competitionId: compId, ...entry } = userEntry

    return { ...entry, username: user.username, avatar: user.avatar, rank }
  },
})

export const get = query({
  args: { competitionId: v.optional(v.id('competitions')) },
  handler: async (ctx, { competitionId }) => {
    if (!competitionId) {
      const currentCompetition = await ctx.db.query('competitions').first()
      if (!currentCompetition) return null
      competitionId = currentCompetition._id
    }
    const competition = await ctx.db
      .query('competitions')
      .withIndex('by_id', (q) => q.eq('_id', competitionId))
      .unique()
    return competition
  },
})

export const addFlowEntry = mutation({
  args: {
    competitionId: v.id('competitions'),
    userId: v.id('users'),
    round: v.number(),
    avgTime: v.float64(),
    score: v.number(),
  },
  handler: async (ctx, { competitionId, userId, ...args }) => {
    const existingEntry = await ctx.db
      .query('flowCompetitionEntries')
      .withIndex('by_competition', (q) => q.eq('competitionId', competitionId))
      .filter((q) => q.eq(q.field('userId'), userId))
      .unique()

    if (existingEntry) {
      await ctx.db.patch(existingEntry._id, args)
    } else {
      await ctx.db.insert('flowCompetitionEntries', {
        competitionId,
        userId,
        ...args,
      })
    }
  },
})

export const addRapidEntry = mutation({
  args: {
    competitionId: v.id('competitions'),
    userId: v.id('users'),
    questions: v.number(),
    avgTime: v.float64(),
    score: v.number(),
  },
  handler: async (ctx, { competitionId, userId, ...args }) => {
    const existingEntry = await ctx.db
      .query('rapidCompetitionEntries')
      .withIndex('by_competition', (q) => q.eq('competitionId', competitionId))
      .filter((q) => q.eq(q.field('userId'), userId))
      .unique()

    if (existingEntry) {
      await ctx.db.patch(existingEntry._id, args)
    } else {
      await ctx.db.insert('rapidCompetitionEntries', {
        competitionId,
        userId,
        ...args,
      })
    }
  },
})
interface Player {
  userId: Id<'users'>
  score: number
  avgTime: number
  round?: number
  questions?: number
}

interface FormattedPlayer extends Omit<Player, 'userId'> {
  username: string
  avatar: string
  rank: number
}
export const getResults = query({
  args: { userId: v.id('users'), competitionId: v.id('competitions') },
  handler: async (ctx, { userId, competitionId }) => {
    // Helper function to fetch and format player data

    const getFormattedPlayers = async (
      entries: (Player & {
        _id: string
        _creationTime: number
        competitionId: string
      })[],
      sortFn: (a: Player, b: Player) => number,
      limit = 3,
    ): Promise<FormattedPlayer[]> => {
      return Promise.all(
        entries
          .sort(sortFn)
          .slice(0, limit)
          .map(
            async ({ _id, _creationTime, competitionId, ...player }, index) => {
              const user = (await ctx.db.get(player.userId))!
              return {
                ...player,
                username: user.username,
                avatar: user.avatar,
                rank: index + 1,
              }
            },
          ),
      )
    }

    // Fetch flow entries once
    const flowEntries = await ctx.db
      .query('flowCompetitionEntries')
      .withIndex('by_competition', (q) => q.eq('competitionId', competitionId))
      .collect()

    // Fetch rapid entries once
    const rapidEntries = await ctx.db
      .query('rapidCompetitionEntries')
      .withIndex('by_competition', (q) => q.eq('competitionId', competitionId))
      .collect()

    // Get flow game results
    const [
      flowGameTopPlayers,
      [flowGameTopAvgTimePlayer],
      [flowGameTopRoundPlayer],
      userFlowEntry,
    ] = await Promise.all([
      getFormattedPlayers(flowEntries, (a, b) => b.score - a.score, 3),
      getFormattedPlayers(flowEntries, (a, b) => a.avgTime - b.avgTime, 1),
      getFormattedPlayers(flowEntries, (a, b) => b.round! - a.round!, 1),
      ctx.db
        .query('flowCompetitionEntries')
        .withIndex('by_competition', (q) =>
          q.eq('competitionId', competitionId),
        )
        .filter((q) => q.eq(q.field('userId'), userId))
        .unique(),
    ])

    // Get rapid game results
    const [
      rapidGameTopPlayers,
      [rapidGameTopAvgTimePlayer],
      [rapidGameTopQuestionsPlayer],
      userRapidEntry,
    ] = await Promise.all([
      getFormattedPlayers(rapidEntries, (a, b) => b.score - a.score, 3),
      getFormattedPlayers(rapidEntries, (a, b) => a.avgTime - b.avgTime, 1),
      getFormattedPlayers(
        rapidEntries,
        (a, b) => b.questions! - a.questions!,
        1,
      ),
      ctx.db
        .query('rapidCompetitionEntries')
        .withIndex('by_competition', (q) =>
          q.eq('competitionId', competitionId),
        )
        .filter((q) => q.eq(q.field('userId'), userId))
        .unique(),
    ])

    return {
      flow: {
        topPlayers: flowGameTopPlayers,
        topAvgTimePlayer: flowGameTopAvgTimePlayer,
        topRoundPlayer: flowGameTopRoundPlayer,
        userPerformance: userFlowEntry,
      },
      rapid: {
        topPlayers: rapidGameTopPlayers,
        topAvgTimePlayer: rapidGameTopAvgTimePlayer,
        topQuestionsPlayer: rapidGameTopQuestionsPlayer,
        userPerformance: userRapidEntry,
      },
    }
  },
})
