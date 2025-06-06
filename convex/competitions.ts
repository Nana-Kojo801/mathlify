import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const create = mutation({
  handler: async (ctx) => {
    await ctx.db.insert('competitions', {
      endTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week from now
      resultViews: [],
      expired: false,
      entries: {
        casual: [],
        speedSolve: [],
      },
    })
  },
})

export const getCurrent = query({
  handler: async (ctx) => {
    const currentCompetition = (await ctx.db.query('competitions').first())!

    const casualEntries = (await Promise.all(currentCompetition.entries.casual.map(async entry => {
      const user = (await ctx.db.get(entry.userId))!
      return {
        username: user.username,
        avatar: user.avatar,
        ...entry
      }
    }))).sort((a, b) => b.score - a.score)

    const speedSolveEntries = (await Promise.all(currentCompetition.entries.speedSolve.map(async entry => {
      const user = (await ctx.db.get(entry.userId))!
      return {
        username: user.username,
        avatar: user.avatar,
        ...entry
      }
    }))).sort((a, b) => b.score - a.score)

    return { ...currentCompetition, entries: { casual: casualEntries, speedSolve: speedSolveEntries } }
  },
})

export const addCasualGameEntry = mutation({
  args: {
    competitionId: v.id('competitions'),
    userId: v.id('users'),
    round: v.number(),
    avgTime: v.float64(),
    score: v.number(),
  },
  handler: async (ctx, { competitionId, userId, ...args }) => {
    const competition = (await ctx.db.get(competitionId))!
    const alreadyExists = competition.entries.casual.some(
      (entry) => entry.userId === userId,
    )

    const entry = {
      userId,
      ...args
    }

    const updatedEntries = alreadyExists
      ? competition.entries.casual.map((existingEntry) =>
          existingEntry.userId === userId ? entry : existingEntry,
        )
      : [...competition.entries.casual, entry]

    await ctx.db.patch(competitionId, {
      entries: {
        casual: updatedEntries,
        speedSolve: competition.entries.speedSolve,
      },
    })
  },
})

export const addSpeedSolveGameEntry = mutation({
  args: {
    competitionId: v.id('competitions'),
    userId: v.id('users'),
    questions: v.number(),
    avgTime: v.float64(),
    score: v.number(),
  },
  handler: async (ctx, { competitionId, userId, ...args }) => {
    const competition = (await ctx.db.get(competitionId))!

    const alreadyExists = competition.entries.speedSolve.some(
      (entry) => entry.userId === userId,
    )

    const entry = {
      userId,
      ...args
    }

    const updatedEntries = alreadyExists
      ? competition.entries.speedSolve.map((existingEntry) =>
          existingEntry.userId === userId ? entry : existingEntry,
        )
      : [...competition.entries.speedSolve, entry]

    await ctx.db.patch(competitionId, {
      entries: {
        casual: competition.entries.casual,
        speedSolve: updatedEntries,
      },
    })
  },
})
