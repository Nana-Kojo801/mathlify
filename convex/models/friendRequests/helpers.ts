import type { User } from '@/types'
import type { MutationCtx, QueryCtx } from '@convex/_generated/server'
import type { FriendRequest } from '@convex/shared/types'
import { addFriendToUser } from '../users/helpers'

export const createFriendRequest = async (
  ctx: MutationCtx,
  senderId: User['_id'],
  receiverId: User['_id'],
) => {
  const id = await ctx.db.insert('friendRequests', {
    senderId,
    receiverId,
    viewedByReceiver: false,
  })
  return (await ctx.db.get(id))!
}

export const acceptFriendRequest = async (
  ctx: MutationCtx,
  id: FriendRequest['_id'],
) => {
  const request = (await ctx.db.get(id))!
  await addFriendToUser(ctx, request.senderId, request.receiverId)
  await ctx.db.delete(id)
}

export const getUserSendRequests = async (ctx: QueryCtx, id: User['_id']) => {
  const requests = await ctx.db
    .query('friendRequests')
    .withIndex('by_sender', (q) => q.eq('senderId', id))
    .collect()

  return await Promise.all(
    requests.map(async (request) => {
      const sender = (await ctx.db.get(request.senderId))!
      const receiver = (await ctx.db.get(request.receiverId))!
      return {
        ...request,
        sender,
        receiver,
      }
    }),
  )
}

export const getUserReceivedRequests = async (
  ctx: QueryCtx,
  id: User['_id'],
) => {
  const requests = await ctx.db
    .query('friendRequests')
    .withIndex('by_receiver', (q) => q.eq('receiverId', id))
    .collect()

  return await Promise.all(
    requests.map(async (request) => {
      const sender = (await ctx.db.get(request.senderId))!
      const receiver = (await ctx.db.get(request.receiverId))!
      return {
        ...request,
        sender,
        receiver,
      }
    }),
  )
}

export const getUnviewedFriendRequestsCount = async (
  ctx: QueryCtx,
  userId: User['_id'],
) => {
  return (
    await ctx.db
      .query('friendRequests')
      .withIndex('by_receiver', (q) => q.eq('receiverId', userId))
      .collect()
  ).filter((request) => request.viewedByReceiver === false).length
}

export const viewUserReceivedFriendRequest = async (
  ctx: MutationCtx,
  userId: User['_id'],
  requestId: FriendRequest['_id'] | undefined,
) => {
  if (requestId) {
    const request = await ctx.db.get(requestId)
    if (!request) return
    if (!request.viewedByReceiver) {
      await ctx.db.patch(requestId, { viewedByReceiver: true })
    }
  } else {
    const userFriendRequests = await ctx.db
      .query('friendRequests')
      .withIndex('by_receiver', (q) => q.eq('receiverId', userId))
      .collect()

    await Promise.all(
      userFriendRequests.map(async (request) => {
        await ctx.db.patch(request._id, { viewedByReceiver: true })
      }),
    )
  }
}
