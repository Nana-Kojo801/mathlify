import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { api } from './_generated/api'

export const insert = mutation({
  args: { senderId: v.id('users'), receiverId: v.id('users') },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert('friendRequests', args)
    return (await ctx.db.get(id))!
  },
})

export const acceptRequests = mutation({
  args: { requestId: v.id('friendRequests') },
  handler: async (ctx, { requestId }) => {
    const request = (await ctx.db.get(requestId))!
    await ctx.runMutation(api.users.addFriend, {
      userId: request.senderId,
      friendId: request.receiverId,
    })
    await ctx.db.delete(requestId)
  },
})

export const getSentRequests = query({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query('friendRequests')
      .filter((q) => q.eq(q.field('senderId'), userId))
      .collect()
  },
})

export const getReceivedRequests = query({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query('friendRequests')
      .filter((q) => q.eq(q.field('receiverId'), userId))
      .collect()
  },
})

export const getFullReceivedRequests = query({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    const requests = await ctx.db
      .query('friendRequests')
      .filter((q) => q.eq(q.field('receiverId'), userId))
      .collect()
    return await Promise.all(
      requests.map(async (request) => {
        const sender = (await ctx.db.get(request.senderId))!
        const receiver = (await ctx.db.get(request.receiverId))!
        return {
          ...request,
          sender,
          receiver,
        }
      }),
    )
  },
})