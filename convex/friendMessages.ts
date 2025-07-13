import { v } from 'convex/values'
import {
  getUserAndFriendMessages,
  getUserFriendChatUnreadMessagesCount,
  markUserFriendChatAsRead,
  sendFriendMessage,
} from './models/friendMessages/helpers'

import { authQuery, authMutation } from './shared/customFunctions'

export const sendMessage = authMutation({
  args: {
    receiverId: v.id('users'),
    message: v.string(),
  },
  handler: async (ctx, { receiverId, message }) => {
    const senderId = ctx.user._id
    return await sendFriendMessage(ctx, senderId, receiverId, message)
  },
})

export const getMessages = authQuery({
  args: { friendId: v.id('users') },
  handler: async (ctx, { friendId }) => {
    const userId = ctx.user._id
    return getUserAndFriendMessages(ctx, userId, friendId)
  },
})

export const markAsRead = authMutation({
  args: { friendId: v.id('users'), messageId: v.optional(v.id("friendMessages")) },
  handler: async (ctx, { friendId, messageId }) => {
    const userId = ctx.user._id
    await markUserFriendChatAsRead(ctx, userId, friendId, messageId)
  },
})

export const getUnreadMessages = authQuery({
  args: { friendId: v.id('users') },
  handler: async (ctx, { friendId }) => {
    const userId = ctx.user._id
    return getUserFriendChatUnreadMessagesCount(ctx, userId, friendId)
  },
})

export const editMessage = authMutation({
  args: { messageId: v.id('friendMessages'), newMessage: v.string() },
  handler: async (ctx, { messageId, newMessage }) => {
    await ctx.db.patch(messageId, {
      message: newMessage,
    })
  },
})

export const deleteMessage = authMutation({
  args: { id: v.id('friendMessages') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})
