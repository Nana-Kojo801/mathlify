import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const create = mutation({
  handler: async (ctx) => {
    const previousCompetition = await ctx.db.query('competitions').order("desc").first()
    if (previousCompetition) {
      await ctx.db.patch(previousCompetition._id, {
        expired: true,
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
    let id = competitionId
    const defaultEntry = {
      userId: user._id,
      username: user.username,
      avatar: user.avatar,
      score: 0,
      avgTime: 0,
      round: 0,
      rank: 0,
    }
    if (!competitionId) {
      const currentCompetition = await ctx.db.query('competitions').first()
      if (!currentCompetition) return defaultEntry
      id = currentCompetition._id
    }
    const userEntry = await ctx.db
      .query('flowCompetitionEntries')
      .withIndex('by_competition', (q) => q.eq('competitionId', id!))
      .filter((q) => q.eq(q.field('userId'), userId))
      .unique()

    if (!userEntry) return defaultEntry

    const rank =
      (
        await ctx.db
          .query('flowCompetitionEntries')
          .withIndex('by_competition', (q) => q.eq('competitionId', id!))
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
      const currentCompetition = await ctx.db.query('competitions').order("desc").first()
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

export const getResults = query({
  args: { userId: v.id('users'), competitionId: v.id('competitions') },
  handler: async (ctx, { userId, competitionId }) => {
    const [flowCompetitionEntries, rapidCompetitionEntries] = await Promise.all(
      [
        Promise.all(
          (
            await ctx.db
              .query('flowCompetitionEntries')
              .withIndex('by_competition', (q) =>
                q.eq('competitionId', competitionId),
              )
              .collect()
          )
            .sort((a, b) => b.score - a.score)
            .map(
              async (
                { _id, _creationTime, competitionId, ...entry },
                index,
              ) => {
                const user = (await ctx.db.get(entry.userId))!
                return {
                  ...entry,
                  avatar: user.avatar,
                  username: user.username,
                  rank: index + 1,
                }
              },
            ),
        ),
        Promise.all(
          (
            await ctx.db
              .query('rapidCompetitionEntries')
              .withIndex('by_competition', (q) =>
                q.eq('competitionId', competitionId),
              )
              .collect()
          )
            .sort((a, b) => b.score - a.score)
            .map(
              async (
                { _id, _creationTime, competitionId, ...entry },
                index,
              ) => {
                const user = (await ctx.db.get(entry.userId))!
                return {
                  ...entry,
                  avatar: user.avatar,
                  username: user.username,
                  rank: index + 1,
                }
              },
            ),
        ),
      ],
    )

    return {
      flow: {
        topPlayers: flowCompetitionEntries
          .sort((a, b) => b.score - a.score)
          .slice(0, 3),
        bestAvgTime: flowCompetitionEntries
          .sort((a, b) => a.avgTime - b.avgTime)[0],
        bestRound: flowCompetitionEntries
          .sort((a, b) => b.round - a.round)[0],
        userPerformance:
          flowCompetitionEntries.find((entry) => entry.userId === userId) ??
          null,
        totalPlayers: flowCompetitionEntries.length
      },
      rapid: {
        topPlayers: rapidCompetitionEntries
          .sort((a, b) => b.score - a.score)
          .slice(0, 3),
        bestAvgTime: rapidCompetitionEntries
          .sort((a, b) => a.avgTime - b.avgTime)[0],
        bestRound: rapidCompetitionEntries
          .sort((a, b) => b.questions - a.questions)[0],
        userPerformance:
          rapidCompetitionEntries.find((entry) => entry.userId === userId) ??
          null,
        totalPlayers: rapidCompetitionEntries.length
      },
    }
  },
})

export const viewResult = mutation({
  args: { competitionId: v.id('competitions'), userId: v.id('users') },
  handler: async (ctx, { competitionId, userId }) => {
    const competition = await ctx.db.get(competitionId)
    if (!competition) return
    if (!competition.resultViews.includes(userId)) {
      await ctx.db.patch(competition._id, {
        resultViews: [...competition.resultViews, userId],
      })
    }
  },
})

export const shouldShowResult = query({
  args: {
    competitionId: v.optional(v.id('competitions')),
    userId: v.id('users'),
  },
  handler: async (ctx, { competitionId, userId }) => {
    if (!competitionId) return false
    const competition = await ctx.db.get(competitionId)
    if (!competition) return false
    const [flowEntry, rapidEntry] = await Promise.all([
      ctx.db
        .query('flowCompetitionEntries')
        .withIndex('by_competition', (q) =>
          q.eq('competitionId', competitionId),
        )
        .filter((q) => q.eq(q.field('userId'), userId))
        .unique(),
      ctx.db
        .query('rapidCompetitionEntries')
        .withIndex('by_competition', (q) =>
          q.eq('competitionId', competitionId),
        )
        .filter((q) => q.eq(q.field('userId'), userId))
        .unique(),
    ])
    if (flowEntry || rapidEntry) {
      if (competition.expired && !competition.resultViews.includes(userId))
        return true
      else return false
    }
    return false
  },
})
