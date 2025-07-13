import { v } from 'convex/values'
import { internalMutation } from './_generated/server'
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

import { authQuery, authMutation } from './shared/customFunctions'

export const create = internalMutation({
  handler: async (ctx) => {
    await createCompetition(ctx)
  },
})

export const getFlowEntries = authQuery({
  args: {
    competitionId: v.optional(v.id('competitions')),
  },
  handler: async (ctx, { competitionId }) => {
    return await getCompetitionFlowEntries(ctx, competitionId)
  },
})

export const getRapidEntries = authQuery({
  args: {
    competitionId: v.optional(v.id('competitions')),
  },
  handler: async (ctx, { competitionId }) => {
    return await getCompetitionRapidEntries(ctx, competitionId)
  },
})

export const getFlowEntry = authQuery({
  args: {
    competitionId: v.optional(v.id('competitions')),
  },
  handler: async (ctx, { competitionId }) => {
    return await getUserCompetitionFlowEntry(ctx, ctx.user._id, competitionId)
  },
})

export const getRapidEntry = authQuery({
  args: {
    competitionId: v.optional(v.id('competitions')),
  },
  handler: async (ctx, { competitionId }) => {
    return await getUserCompetitionRapidEntry(ctx, ctx.user._id, competitionId)
  },
})

export const get = authQuery({
  args: { competitionId: v.optional(v.id('competitions')) },
  handler: async (ctx, { competitionId }) => {
    return getCompetitionOrCurrent(ctx, competitionId)
  },
})

export const addFlowEntry = authMutation({
  args: {
    competitionId: v.id('competitions'),
    round: v.number(),
    avgTime: v.float64(),
    score: v.number(),
  },
  handler: async (ctx, { competitionId, ...args }) => {
    await addUserFlowEntry(ctx, ctx.user._id, competitionId, args)
  },
})

export const addRapidEntry = authMutation({
  args: {
    competitionId: v.id('competitions'),
    questions: v.number(),
    avgTime: v.float64(),
    score: v.number(),
  },
  handler: async (ctx, { competitionId, ...args }) => {
    await addUserRapidEntry(ctx, ctx.user._id, competitionId, args)
  },
})

export const getResults = authQuery({
  args: { userId: v.id('users'), competitionId: v.id('competitions') },
  handler: async (ctx, { userId, competitionId }) => {
    return await getCompetitionResult(ctx, userId, competitionId)
  },
})

export const viewResult = authMutation({
  args: { competitionId: v.id('competitions') },
  handler: async (ctx, { competitionId }) => {
    const competition = await ctx.db.get(competitionId)
    if (!competition) return
    if (!competition.resultViews.includes(ctx.user._id)) {
      await Promise.all([
        ctx.db.patch(ctx.user._id, { lastCompetition: undefined }),
        ctx.db.patch(competition._id, {
          resultViews: [...competition.resultViews, ctx.user._id],
        }),
      ])
    }
  },
})

export const getWeek = authQuery({
  handler: async (ctx) => {
    return (await ctx.db.query('competitions').collect()).length
  },
})

export const shouldShowResult = authQuery({
  args: {
    competitionId: v.optional(v.id('competitions')),
  },
  handler: async (ctx, { competitionId }) => {
    const userId = ctx.user._id
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
