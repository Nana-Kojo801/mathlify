import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { acceptFriendRequest, createFriendRequest, getUserReceivedRequests, getUserSendRequests } from './models/friendRequests/helpers'

export const insert = mutation({
  args: { senderId: v.id('users'), receiverId: v.id('users') },
  handler: async (ctx, { senderId, receiverId }) => {
    return await createFriendRequest(ctx, senderId, receiverId)
  },
})

export const acceptRequests = mutation({
  args: { requestId: v.id('friendRequests') },
  handler: async (ctx, { requestId }) => {
    await acceptFriendRequest(ctx, requestId)
  },
})

export const getSentRequests = query({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    return getUserSendRequests(ctx, userId)
  },
})

export const getReceivedRequests = query({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    return await getUserReceivedRequests(ctx, userId)
  },
})