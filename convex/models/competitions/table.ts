import { defineTable } from 'convex/server'
import { v } from 'convex/values'

export const competitions = defineTable({
  endTime: v.number(),
  resultViews: v.array(v.id('users')),
  expired: v.boolean(),
})

export const flowCompetitionEntries = defineTable({
  competitionId: v.id('competitions'),
  userId: v.id('users'),
  round: v.number(),
  avgTime: v.float64(),
  score: v.number(),
})
  .index('by_competition', ['competitionId'])
  .index('by_user_and_competition', ['userId', 'competitionId'])

export const rapidCompetitionEntries = defineTable({
  competitionId: v.id('competitions'),
  userId: v.id('users'),
  questions: v.number(),
  avgTime: v.float64(),
  score: v.number(),
})
  .index('by_competition', ['competitionId'])
  .index('by_user_and_competition', ['userId', 'competitionId'])
