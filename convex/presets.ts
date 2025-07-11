import { v } from 'convex/values'
import { createUserPreset, getUserPresets } from './models/presets/helpers'

import { authQuery, authMutation } from './shared/customFunctions'


export const get = authQuery({
  handler: async (ctx) => {
    return getUserPresets(ctx, ctx.user._id)
  },
})

export const createPreset = authMutation({
  args: {
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
  handler: async (ctx, { type, name, ...settings }) => {
    await createUserPreset(ctx, ctx.user._id, type, name, settings)
  },
})

export const deletePreset = authMutation({
  args: { id: v.id('presets') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})
