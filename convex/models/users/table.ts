import { defineTable } from 'convex/server'
import { v } from 'convex/values'

export const userTable = defineTable({
  username: v.string(),
  password: v.string(),
  avatar: v.string(),
  elo: v.object({
    flow: v.number(),
    rapid: v.number(),
  }),
  friends: v.array(v.id('users')),
  lastCompetition: v.optional(v.id('competitions')),
  lastActive: v.number(),
  storageId: v.optional(v.id('_storage')),
})
  .index('by_username', ['username'])
  .searchIndex('search_user', {
    searchField: 'username',
  })

export const userGameData = defineTable({
  flow: v.object({
    wins: v.number(),
    losses: v.number(),
    peakElo: v.number(),
  }),
  rapid: v.object({
    wins: v.number(),
    losses: v.number(),
    peakElo: v.number(),
  }),
})
