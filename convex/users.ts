import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const get = query({
  args: { id: v.id('users') },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id)
  },
})

export const getByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    return await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('username'), username))
      .first()
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
    const id = await ctx.db.insert('users', {
      ...args,
      avatar: `https://ui-avatars.com/api/?background=random&name=${args.username[0]}`,
      elo: {
        casual: 0,
        speedSolve: 0,
      },
      friends: [],
    })
    return (await ctx.db.get(id))!
  },
})

export const updateProfile = mutation({
  args: {
    userId: v.id('users'),
    username: v.string(),
    password: v.string(),
    avatar: v.string(),
  },
  handler: async (ctx, { userId, ...patch }) => {
    await ctx.db.patch(userId, patch)
  },
})

export const addFriend = mutation({
  args: { userId: v.id('users'), friendId: v.id('users') },
  handler: async (ctx, { userId, friendId }) => {
    const [user, friend] = await Promise.all([
      ctx.db.get(userId),
      ctx.db.get(friendId),
    ])
    await Promise.all([
      ctx.db.patch(friendId, {
        friends: Array.from(new Set([...friend!.friends, userId])),
      }),
      ctx.db.patch(userId, {
        friends: Array.from(new Set([...user!.friends, friendId])),
      }),
    ])
  },
})
