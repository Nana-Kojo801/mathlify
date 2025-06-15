import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const joinRapidQueue = mutation({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    const playerInQueue = await ctx.db
      .query('rapidOnlineQueue')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .unique()

    if (playerInQueue) return

    await ctx.db.insert('rapidOnlineQueue', {
      userId,
      isSearching: true,
      maxWaitTime: 1000 * 30,
      joinedAt: Date.now(),
    })
  },
})

export const getQueueStatus = query({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    const status = await ctx.db
      .query('rapidOnlineQueue')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .unique()
    return status
  },
})

export const getRapidQueueActiveSize = query({
  handler: async (ctx) => {
    return (
      await ctx.db
        .query('rapidOnlineQueue')
        .filter((q) => q.eq(q.field('isSearching'), true))
        .collect()
    ).length
  },
})

export const leaveRapidQueue = mutation({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    const queueEntry = await ctx.db
      .query('rapidOnlineQueue')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .unique()

    if (queueEntry) {
      await ctx.db.delete(queueEntry._id)
    }

    return { success: true }
  },
})
