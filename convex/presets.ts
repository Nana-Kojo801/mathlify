import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const get = query({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query('presets')
      .filter((q) => q.eq(q.field('userId'), userId))
      .collect()
  },
})

export const createCasualPreset = mutation({
  args: {
    userId: v.id('users'),
    name: v.string(),
    range: v.object({
      min: v.number(),
      max: v.number(),
    }),
    quantity: v.object({
      min: v.number(),
      max: v.number(),
    }),
    timeInterval: v.float64(),
    duration: v.float64(),
  },
  handler: async (ctx, { userId, name, ...settings }) => {
    await ctx.db.insert('presets', { settings, name, type: 'casual', userId })
  },
})

export const createSpeedSolvePreset = mutation({
  args: {
    userId: v.id('users'),
    name: v.string(),
    range: v.object({
      min: v.number(),
      max: v.number(),
    }),
    quantity: v.object({
      min: v.number(),
      max: v.number(),
    }),
    duration: v.float64(),
  },
  handler: async (ctx, { userId, name, ...settings }) => {
    await ctx.db.insert('presets', {
      settings,
      name,
      type: 'speedSolve',
      userId,
    })
  },
})

export const deletePreset = mutation({
  args: { id: v.id('presets') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})
