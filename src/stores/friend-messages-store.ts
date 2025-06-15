import { create } from 'zustand'
import type { FriendMessage, User } from '@/types'
import { db } from '@/lib/dexie'
import { api } from '@convex/_generated/api'
import type { ConvexReactClient } from 'convex/react'

type FriendMessagesState = {
  messages: FriendMessage[]
  setMessages: (messages: FriendMessage[]) => void
  addMessage: (message: FriendMessage) => void
  getFriendMessages: (
    userId: User['_id'],
    friendId: User['_id'],
  ) => FriendMessage[]
}

export const useFriendMessagesStore = create<FriendMessagesState>(
  (set, get) => ({
    messages: [],
    setMessages: (messages) => set({ messages }),
    addMessage: async (message) => {
      await db.friendMessages.add(message)
      set((state) => ({ messages: [...state.messages, message] }))
    },
    getFriendMessages: (userId, friendId) => {
      return get().messages.filter(
        (message) =>
          (message.senderId === friendId && message.receiverId === userId) ||
          (message.senderId === userId && message.receiverId === friendId),
      )
    },
  }),
)

export const syncFriendMessages = async ({
  user,
  online,
  convex,
}: {
  user: User
  online: boolean
  convex: ConvexReactClient
}) => {
  if (online) {
    const allMessages = await Promise.all(
      user!.friends.map(async (friendId) => {
        const friendMessages = await convex.query(
          api.friendMessages.getMessages,
          { friendId, userId: user!._id },
        )
        await Promise.all(
          friendMessages.map(async (message: FriendMessage) => {
            const localMessage = await db.friendMessages.get(message._id)
            if (!localMessage) {
              await db.friendMessages.add(message)
            } else {
              await db.friendMessages.update(message._id, message)
            }
          }),
        )
        return friendMessages
      }),
    )
    useFriendMessagesStore.getState().setMessages(allMessages.flat())
  } else {
    const localMessages = await db.friendMessages.toArray()
    useFriendMessagesStore.getState().setMessages(localMessages)
  }
}
