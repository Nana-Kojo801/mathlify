import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { createUserPreset, getUserPresets } from './models/presets/helpers'

export const get = query({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    return getUserPresets(ctx, userId)
  },
})

export const createPreset = mutation({
  args: {
    userId: v.id('users'),
    type: v.union(v.literal('flow'), v.literal('rapid')),
    name: v.string(),
    range: v.object({
      min: v.number(),
      max: v.number(),
    }),
    quantity: v.object({
      min: v.number(),
      max: v.number(),
    }),
    timeInterval: v.optional(v.float64()),
    duration: v.float64(),
  },
  handler: async (ctx, { userId, type, name, ...settings }) => {
    await createUserPreset(ctx, userId, type, name, settings)
  },
})

export const deletePreset = mutation({
  args: { id: v.id('presets') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})
