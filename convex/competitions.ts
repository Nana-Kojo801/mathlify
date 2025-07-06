import { v } from 'convex/values'
import { internalMutation, mutation, query } from './_generated/server'
import {
  addUserFlowEntry,
  addUserRapidEntry,
  createCompetition,
  getCompetitionFlowEntries,
  getCompetitionRapidEntries,
  getCompetitionOrCurrent,
  getCompetitionResult,
  getUserCompetitionFlowEntry,
  getUserCompetitionRapidEntry,
} from './models/competitions/helpers'

export const create = internalMutation({
  handler: async (ctx) => {
    await createCompetition(ctx)
  },
})

export const getFlowEntries = query({
  args: {
    competitionId: v.optional(v.id('competitions')),
  },
  handler: async (ctx, { competitionId }) => {
    return await getCompetitionFlowEntries(ctx, competitionId)
  },
})

export const getRapidEntries = query({
  args: {
    competitionId: v.optional(v.id('competitions')),
  },
  handler: async (ctx, { competitionId }) => {
    return await getCompetitionRapidEntries(ctx, competitionId)
  },
})

export const getFlowEntry = query({
  args: {
    userId: v.id('users'),
    competitionId: v.optional(v.id('competitions')),
  },
  handler: async (ctx, { userId, competitionId }) => {
    return await getUserCompetitionFlowEntry(ctx, userId, competitionId)
  },
})

export const getRapidEntry = query({
  args: {
    userId: v.id('users'),
    competitionId: v.optional(v.id('competitions')),
  },
  handler: async (ctx, { userId, competitionId }) => {
    return await getUserCompetitionRapidEntry(ctx, userId, competitionId)
  },
})

export const get = query({
  args: { competitionId: v.optional(v.id('competitions')) },
  handler: async (ctx, { competitionId }) => {
    return getCompetitionOrCurrent(ctx, competitionId)
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
    await addUserFlowEntry(ctx, userId, competitionId, args)
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
    await addUserRapidEntry(ctx, userId, competitionId, args)
  },
})

export const getResults = query({
  args: { userId: v.id('users'), competitionId: v.id('competitions') },
  handler: async (ctx, { userId, competitionId }) => {
    return await getCompetitionResult(ctx, userId, competitionId)
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

export const getWeek = query({
  handler: async (ctx) => {
    return (await ctx.db.query('competitions').collect()).length
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
        .withIndex('by_user_and_competition', (q) =>
          q.eq('userId', userId).eq('competitionId', competitionId),
        )
        .unique(),
      ctx.db
        .query('rapidCompetitionEntries')
        .withIndex('by_user_and_competition', (q) =>
          q.eq('userId', userId).eq('competitionId', competitionId),
        )
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
