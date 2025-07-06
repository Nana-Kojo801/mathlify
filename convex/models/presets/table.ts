import { defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineTable({
  userId: v.id('users'),
  name: v.string(),
  type: v.union(v.literal('flow'), v.literal('rapid')),
  settings: v.object({
    range: v.object({
      min: v.number(),
      max: v.number(),
    }),
    quantity: v.object({
      min: v.number(),
      max: v.number(),
    }),
    timeInterval: v.optional(v.float64()),
    duration: v.float64(),
  }),
})
  .index('by_user', ['userId'])
  .index('by_type', ['type'])
