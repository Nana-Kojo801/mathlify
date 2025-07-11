import type { MutationCtx, QueryCtx } from '@convex/_generated/server'
import type { Doc, Id } from '@convex/_generated/dataModel'
import type { User } from '../../shared/types'

export const insertUser = async (
  ctx: MutationCtx,
  data: Omit<Doc<'users'>, '_id' | '_creationTime'>,
) => {
  const id = await ctx.db.insert('users', data)
  return (await ctx.db.get(id))!
}

export const getUserByUsername = async (
  ctx: QueryCtx,
  username: Doc<'users'>['username'],
) => {
  return await ctx.db
    .query('users')
    .withIndex('by_username', (q) => q.eq('username', username))
    .unique()
}

export const getUserByEmail = async (
  ctx: QueryCtx,
  email: Doc<'users'>['email'],
) => {
  return await ctx.db
    .query('users')
    .withIndex('email', (q) => q.eq('email', email))
    .unique()
}


export const updateUser = async (
  ctx: MutationCtx,
  id: Id<'users'>,
  patch: Partial<Doc<'users'>>,
) => {
  await ctx.db.patch(id, patch)
}

export const deleteUser = async (ctx: MutationCtx, id: Id<'users'>) => {
  await ctx.db.delete(id)
  return id
}

export const searchUser = async (
  ctx: QueryCtx,
  username: Doc<'users'>['username'],
) => {
  return await ctx.db
    .query('users')
    .withSearchIndex('search_user', (q) => q.search('username', username))
    .collect()
}

export const addFriendToUser = async (
  ctx: MutationCtx,
  userId: User['_id'],
  friendId: User['_id'],
) => {
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
}
