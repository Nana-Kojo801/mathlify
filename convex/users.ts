import { v } from 'convex/values'
import { query } from './_generated/server'
import {
  addFriendToUser,
  getUserByEmail,
  getUserByUsername,
  insertUser,
  updateUser,
} from './models/users/helpers'
import { authQuery, authMutation } from './shared/customFunctions'
import { getAuthUserId } from '@convex-dev/auth/server'

export const getAuthUser = query({
  handler: async (ctx) => {
    const id = await getAuthUserId({ auth: ctx.auth })
    if (!id) return null
    return (await ctx.db.get(id))!
  }
})

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

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    return await getUserByEmail(ctx, email)
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

export const searchUsers = authQuery({
  args: { query: v.string() },
  handler: async (ctx, { query }) => {
    if (query === '') return []
    return await ctx.db
      .query('users')
      .withSearchIndex('search_user', (q) => q.search('username', query))
      .collect()
  },
})

export const insert = authMutation({
  args: { username: v.string(), email: v.string(), avatar: v.string() },
  handler: async (ctx, args) => {
    return await insertUser(ctx, {
      ...args,
      elo: {
        flow: 0,
        rapid: 0,
      },
      friends: [],
      lastActive: Date.now(),
    })
  },
})

export const update = authMutation({
  args: {
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
  handler: async (ctx, changes) => {
    await updateUser(ctx, ctx.user._id, changes)
  },
})

export const updatePresence = authMutation({
  handler: async (ctx) => {
    await updateUser(ctx, ctx.user._id, { lastActive: Date.now() })
  },
})

export const addFriend = authMutation({
  args: { friendId: v.id('users') },
  handler: async (ctx, { friendId }) => {
    await addFriendToUser(ctx, ctx.user._id, friendId)
  },
})

export const updateLastCompetition = authMutation({
  args: { competitionId: v.id('competitions') },
  handler: async (ctx, { competitionId }) => {
    await ctx.db.patch(ctx.user._id, {
      lastCompetition: competitionId,
    })
  },
})
