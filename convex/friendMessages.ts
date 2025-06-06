import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const sendMessage = mutation({
  args: {
    senderId: v.id('users'),
    receiverId: v.id('users'),
    message: v.string(),
  },
  handler: async (ctx, { senderId, receiverId, message }) => {
    const id = await ctx.db.insert('friendMessages', {
      senderId,
      receiverId,
      message,
      readBy: [senderId],
    })
    const newMessage = (await ctx.db.get(id))!
    const sender = (await ctx.db.get(senderId))!
    const receiver = (await ctx.db.get(receiverId))!

    return { ...newMessage, sender, receiver }
  },
})

export const getMessages = query({
  args: { userId: v.id('users'), friendId: v.id('users') },
  handler: async (ctx, { userId, friendId }) => {
    const messages = await ctx.db
      .query('friendMessages')
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field('senderId'), userId),
            q.eq(q.field('receiverId'), friendId),
          ),
          q.and(
            q.eq(q.field('senderId'), friendId),
            q.eq(q.field('receiverId'), userId),
          ),
        ),
      )
      .order('asc')
      .collect()
    return await Promise.all(
      messages.map(async (message) => {
        const sender = (await ctx.db.get(message.senderId))!
        const receiver = (await ctx.db.get(message.receiverId))!
        return {
          ...message,
          sender,
          receiver,
        }
      }),
    )
  },
})

export const markAsRead = mutation({
  args: { userId: v.id('users'), friendId: v.id('users') },
  handler: async (ctx, { userId, friendId }) => {
    const messages = await ctx.db
      .query('friendMessages')
      .filter((q) =>
        q.and(
          q.eq(q.field('senderId'), friendId),
          q.eq(q.field('receiverId'), userId),
        ),
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
  },
})

export const getUnreadMessages = query({
  args: { userId: v.id('users'), friendId: v.id('users') },
  handler: async (ctx, { userId, friendId }) => {
    const userConversation = await ctx.db
      .query('userConversations')
      .withIndex('by_user_and_friend', (q) =>
        q.eq('userId', userId).eq('friendId', friendId),
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
  },
})
