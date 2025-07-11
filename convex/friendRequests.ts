import { v } from 'convex/values'
import {
  acceptFriendRequest,
  createFriendRequest,
  getUserReceivedRequests,
  getUserSendRequests,
} from './models/friendRequests/helpers'
import { authQuery, authMutation } from './shared/customFunctions'

export const insert = authMutation({
  args: { receiverId: v.id('users') },
  handler: async (ctx, { receiverId }) => {
    const senderId = ctx.user._id
    return await createFriendRequest(ctx, senderId, receiverId)
  },
})

export const acceptRequests = authMutation({
  args: { requestId: v.id('friendRequests') },
  handler: async (ctx, { requestId }) => {
    await acceptFriendRequest(ctx, requestId)
  },
})

export const getSentRequests = authQuery({
  handler: async (ctx) => {
    const userId = ctx.user._id
    return getUserSendRequests(ctx, userId)
  },
})

export const getReceivedRequests = authQuery({
  handler: async (ctx) => {
    const userId = ctx.user._id
    return await getUserReceivedRequests(ctx, userId)
  },
})
