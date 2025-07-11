import { defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineTable({
  senderId: v.id('users'),
  receiverId: v.id('users'),
  viewedByReceiver: v.boolean()
})
  .index('by_sender', ['senderId'])
  .index('by_receiver', ['receiverId'])
