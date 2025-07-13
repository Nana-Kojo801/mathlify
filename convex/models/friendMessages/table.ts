import { defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineTable({
  senderId: v.id('users'),
  receiverId: v.id('users'),
  message: v.string(),
  readBy: v.array(v.id('users')),
}).index('by_sender_and_receiver', ['senderId', 'receiverId'])
