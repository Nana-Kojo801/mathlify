import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import {
  addFriendToUser,
  getUserByUsername,
  insertUser,
  updateUser,
} from './models/users/helpers'

export const get = query({
  args: { id: v.id('users') },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id)
  },
})

export const getByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    return await getUserByUsername(ctx, username)
  },
})

export const getUsers = query({
  args: { users: v.array(v.id('users')) },
  handler: async (ctx, { users }) => {
    return await Promise.all(
      users.map(async (userId) => {
        return (await ctx.db.get(userId))!
      }),
    )
  },
})

export const searchUsers = query({
  args: { query: v.string() },
  handler: async (ctx, { query }) => {
    if (query === '') return []
    return await ctx.db
      .query('users')
      .withSearchIndex('search_user', (q) => q.search('username', query))
      .collect()
  },
})

export const insert = mutation({
  args: { username: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    return await insertUser(ctx, {
      ...args,
      avatar: `https://ui-avatars.com/api/?background=random&name=${args.username[0]}`,
      elo: {
        flow: 0,
        rapid: 0,
      },
      friends: [],
      lastActive: Date.now(),
    })
  },
})

export const update = mutation({
  args: {
    userId: v.id('users'),
    username: v.optional(v.string()),
    password: v.optional(v.string()),
    avatar: v.optional(v.string()),
    elo: v.optional(
      v.object({
        flow: v.number(),
        rapid: v.number(),
      }),
    ),
    friends: v.optional(v.array(v.id('users'))),
    lastCompetition: v.optional(v.optional(v.id('competitions'))),
    lastActive: v.optional(v.number()),
    storageId: v.optional(v.id('_storage')),
  },
  handler: async (ctx, { userId, ...changes }) => {
    await updateUser(ctx, userId, changes)
  },
})

export const updatePresence = mutation({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    await ctx.db.patch(userId, { lastActive: Date.now() })
  },
})

export const addFriend = mutation({
  args: { userId: v.id('users'), friendId: v.id('users') },
  handler: async (ctx, { userId, friendId }) => {
    await addFriendToUser(ctx, userId, friendId)
  },
})

export const updateLastCompetition = mutation({
  args: { userId: v.id('users'), competitionId: v.id('competitions') },
  handler: async (ctx, { userId, competitionId }) => {
    await ctx.db.patch(userId, {
      lastCompetition: competitionId,
    })
  },
})
