import type { User } from '@/types'
import { create } from 'zustand'
import { useInitStore } from './init-store'
import { api } from '@convex/_generated/api'
import { db } from '@/lib/dexie'
import type { ConvexReactClient } from 'convex/react'

type FriendsStoreType = {
  friends: User[]
  setFriends: (friends: User[]) => void
  addFriend: (friendId: User) => Promise<void>
  getFriend: (friendId: User['_id']) => User
}

export const useFriendsStore = create<FriendsStoreType>((set, get) => ({
  friends: [],
  setFriends: (friends) => {
    set({ friends })
  },
  getFriend: (friendId: User['_id']) => {
    return get().friends.find((friend) => friend._id === friendId)!
  },
  addFriend: async (friend) => {
    await db.friends.add(friend)
    set((state) => ({
      friends: [...state.friends, friend],
    }))
  },
}))

export const registerFriendsStore = (
  convex: ConvexReactClient,
  user: User,
  online: boolean,
) => {
  useInitStore.getState().registerTask(async () => {
    if (online) {
      const friends = await convex.query(api.users.getUsers, {
        users: user.friends,
      })
      await db.friends.clear()
      await Promise.all(
        friends.map(async (friend) => {
          await db.friends.add(friend)
        }),
      )
      useFriendsStore.getState().setFriends(friends)
    } else {
      const localFriends = await db.friends.toArray()
      useFriendsStore.getState().setFriends(localFriends)
    }
  })
}
