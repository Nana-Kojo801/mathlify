import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    username: v.string(),
    password: v.string(),
    avatar: v.string(),
    elo: v.object({
      flow: v.number(),
      rapid: v.number(),
    }),
    friends: v.array(v.id('users')),
    lastCompetition: v.optional(v.id('competitions')),
    lastActive: v.number()
  })
    .index('by_uesrname', ['username'])
    .searchIndex('search_user', {
      searchField: 'username',
    }),
  useGameData: defineTable({
    flow: v.object({
      wins: v.number(),
      losses: v.number(),
      peakElo: v.number()
    }),
    rapid: v.object({
      wins: v.number(),
      losses: v.number(),
      peakElo: v.number()
    })
  }),
  friendRequests: defineTable({
    senderId: v.id('users'),
    receiverId: v.id('users'),
  }),
  friendMessages: defineTable({
    senderId: v.id('users'),
    receiverId: v.id('users'),
    message: v.string(),
    readBy: v.array(v.id('users')),
  }),
  userConversations: defineTable({
    userId: v.id('users'),
    friendId: v.id('users'),
    lastReadTimestamp: v.number(),
  }).index('by_user_and_friend', ['userId', 'friendId']),
  presets: defineTable({
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
  }),
  flowCompetitionEntries: defineTable({
    competitionId: v.id('competitions'),
    userId: v.id('users'),
    round: v.number(),
    avgTime: v.float64(),
    score: v.number(),
  })
    .index('by_competition', ['competitionId'])
    .index('by_user', ['userId']),
  rapidCompetitionEntries: defineTable({
    competitionId: v.id('competitions'),
    userId: v.id('users'),
    questions: v.number(),
    avgTime: v.float64(),
    score: v.number(),
  })
    .index('by_competition', ['competitionId'])
    .index('by_user', ['userId']),
  competitions: defineTable({
    endTime: v.number(),
    resultViews: v.array(v.id('users')),
    expired: v.boolean(),
  }),
  rapidOnlineMatches: defineTable({
    player1Id: v.optional(v.id("users")),
    player2Id: v.optional(v.id("users")),
    status: v.union(v.literal("waiting"), v.literal("countdown"), v.literal("questions"), v.literal("result")),
    gamePhase: v.object({
      type: v.union(v.literal("waiting"), v.literal("countdown"), v.literal("questions"), v.literal("result")),
      startTime: v.number(),
      endTime: v.number()
    }),
    gameResult: v.object({
      player1: v.number(),
      player2: v.number()
    })
  }),
  rapidOnlineQueue: defineTable({
    userId: v.id("users"),
    isSearching: v.boolean(),
    maxWaitTime: v.number(),
    joinedAt: v.number()
  }).index("by_userId", ["userId"])
})
