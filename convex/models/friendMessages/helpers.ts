import type { User } from '@/types'
import type { MutationCtx, QueryCtx } from '@convex/_generated/server'
import type { FriendMessage } from '@convex/shared/types'

export const sendFriendMessage = async (
  ctx: MutationCtx,
  senderId: User['_id'],
  receiverId: User['_id'],
  message: FriendMessage['message'],
) => {
  const id = await ctx.db.insert('friendMessages', {
    senderId,
    receiverId,
    message,
    readBy: [senderId],
  })
  const [newMessage, sender, receiver] = await Promise.all([
    ctx.db.get(id),
    ctx.db.get(senderId),
    ctx.db.get(receiverId),
  ])

  return { ...newMessage!, sender: sender!, receiver: receiver! }
}

export const getUserAndFriendMessages = async (
  ctx: QueryCtx,
  userId: User['_id'],
  friendId: User['_id'],
) => {
  const messages = (
    await ctx.db.query('friendMessages').order('asc').collect()
  ).filter((message) => {
    return (
      (message.senderId === userId && message.receiverId === friendId) ||
      (message.senderId === friendId && message.receiverId === userId)
    )
  })
  return await Promise.all(
    messages.map(async (message) => {
      const [sender, receiver] = await Promise.all([
        ctx.db.get(message.senderId),
        ctx.db.get(message.receiverId),
      ])
      return {
        ...message,
        sender: sender!,
        receiver: receiver!,
      }
    }),
  )
}

export const markUserFriendChatAsRead = async (
  ctx: MutationCtx,
  userId: User['_id'],
  friendId: User['_id'],
) => {
  const messages = await ctx.db
    .query('friendMessages')
    .withIndex('by_sender_and_receiver', (q) =>
      q.eq('senderId', friendId).eq('receiverId', userId),
    )
    .collect()
  await Promise.all(
    messages.map(async (message) => {
      await ctx.db.patch(message._id, {
        readBy: [...message.readBy, userId],
      })
    }),
  )

  const userConversation = await ctx.db
    .query('userConversations')
    .withIndex('by_user_and_friend', (q) =>
      q.eq('userId', userId).eq('friendId', friendId),
    )
    .unique()

  if (userConversation) {
    await ctx.db.patch(userConversation._id, {
      lastReadTimestamp: Date.now(),
    })
  } else {
    await ctx.db.insert('userConversations', {
      userId,
      friendId,
      lastReadTimestamp: Date.now(),
    })
  }
}

export const getUserFriendChatUnreadMessagesCount = async (
  ctx: QueryCtx,
  userId: User['_id'],
  friendId: User['_id'],
) => {
  const userConversation = await ctx.db
    .query('userConversations')
    .withIndex('by_user_and_friend', (q) =>
      q.eq('userId', userId).eq('friendId', friendId)
    )
    .unique()

  if (!userConversation) return 0

  const messages = await ctx.db
    .query('friendMessages')
    .filter((q) =>
      q.and(
        q.eq(q.field('senderId'), friendId),
        q.eq(q.field('receiverId'), userId),
      ),
    )
    .filter((q) =>
      q.gt(q.field('_creationTime'), userConversation.lastReadTimestamp),
    )
    .collect()
  return messages.filter((message) => !message.readBy.includes(userId)).length
}
