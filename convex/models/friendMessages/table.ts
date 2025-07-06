import { defineTable } from 'convex/server'
import { v } from 'convex/values'

export const friendMessagesTable = defineTable({
  senderId: v.id('users'),
  receiverId: v.id('users'),
  message: v.string(),
  readBy: v.array(v.id('users')),
}).index('by_sender_and_receiver', ['senderId', 'receiverId'])

export const userConversationsTable = defineTable({
  userId: v.id('users'),
  friendId: v.id('users'),
  lastReadTimestamp: v.number(),
}).index('by_user_and_friend', ['userId', 'friendId'])
