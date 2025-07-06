import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import {
  getUserAndFriendMessages,
  getUserFriendChatUnreadMessagesCount,
  markUserFriendChatAsRead,
  sendFriendMessage,
} from './models/friendMessages/helpers'

export const sendMessage = mutation({
  args: {
    senderId: v.id('users'),
    receiverId: v.id('users'),
    message: v.string(),
  },
  handler: async (ctx, { senderId, receiverId, message }) => {
    return await sendFriendMessage(ctx, senderId, receiverId, message)
  },
})

export const getMessages = query({
  args: { userId: v.id('users'), friendId: v.id('users') },
  handler: async (ctx, { userId, friendId }) => {
    return getUserAndFriendMessages(ctx, userId, friendId)
  },
})

export const markAsRead = mutation({
  args: { userId: v.id('users'), friendId: v.id('users') },
  handler: async (ctx, { userId, friendId }) => {
    await markUserFriendChatAsRead(ctx, userId, friendId)
  },
})

export const getUnreadMessages = query({
  args: { userId: v.id('users'), friendId: v.id('users') },
  handler: async (ctx, { userId, friendId }) => {
    return getUserFriendChatUnreadMessagesCount(ctx, userId, friendId)
  },
})

export const editMessage = mutation({
  args: { messageId: v.id('friendMessages'), newMessage: v.string() },
  handler: async (ctx, { messageId, newMessage }) => {
    await ctx.db.patch(messageId, {
      message: newMessage,
    })
  },
})

export const deleteMessage = mutation({
  args: { id: v.id('friendMessages') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})
