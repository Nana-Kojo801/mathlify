import { useAuth } from '@/components/app-wrapper'
import { db } from '@/lib/dexie'
import type { User } from '@/types'
import { api } from '@convex/_generated/api'
import type { ConvexReactClient } from 'convex/react'
import { toast } from 'sonner'
import { createStore } from 'zustand'
import type { Id } from '@convex/_generated/dataModel'

export const SESSION_KEY = 'mathlify-session'

export interface AuthStoreType {
  user: User | null
  loading: boolean
  authenticated: boolean
  init: (online: boolean) => Promise<void>
  updateAuthUser: (changes: Partial<User>) => Promise<void>
  editProfile: (
    values: { username: string } & {
      avatar: File | null
    },
  ) => Promise<void>
}

const getUser = async (
  convex: ConvexReactClient,
  online: boolean,
) => {
  if (online) {
    console.log('geeting online user');
    
    const authUser = (await convex.query(api.users.getAuthUser))!

    if(!authUser) return null

    const existingLocalUser = await db.users
      .filter((localUser) => localUser.email === authUser!.email)
      .first()

    if (existingLocalUser) {
      await db.users.update(authUser._id, authUser)
    } else {
      await db.users.add(authUser)
    }
    return authUser
  }
  return ((await db.users.toArray())[0])!
}

export const createAuthStore = (
  convex: ConvexReactClient,
) =>
  createStore<AuthStoreType>((set, get) => ({
    user: null,
    loading: false,
    authenticated: false,
    init: async (online: boolean) => {
      try {
        set({ loading: true })
        console.log('initing');
        
        const user = await getUser(convex, online)
        set({ user, loading: false, authenticated: user === null ? false : true })
      } catch (e) {
        console.error(e)
        set({ loading: false, authenticated: false })
        toast.error('[AUTH]: AN ERROR OCCURED')
      }
    },
    editProfile: async (values) => {
      const user = get().user
      try {
        if (values.username !== user!.username) {
          const existingUserWithUsername = await convex.query(
            api.users.getByUsername,
            { username: values.username },
          )
          if (existingUserWithUsername) {
            toast.error('Username already exists')
            return
          }
        }
        let newAvatar = user!.avatar
        let storageId: undefined | Id<'_storage'> = undefined
        if (values.avatar) {
          const postUrl = await convex.mutation(api.upload.generateUploadUrl)
          const result = await fetch(postUrl, {
            method: 'POST',
            headers: {
              'Content-type': values.avatar.type,
            },
            body: values.avatar,
          }).then((res) => res.json())
          storageId = result.storageId as Id<'_storage'>
          newAvatar = (await convex.query(api.upload.getUrl, {
            storageId: result.storageId,
          }))!
        }
        set({ user: Object.assign(user!, { ...values, avatar: newAvatar }) })
        if (user!.storageId && storageId) {
          await convex.mutation(api.upload.deleteStorageId, { id: storageId })
        }
        await Promise.all([
          db.users.update(user!._id, {
            ...values,
            avatar: newAvatar,
          }),
          convex.mutation(api.users.update, {
            ...values,
            avatar: newAvatar,
            storageId: storageId,
          }),
        ])
        toast.success('Successfully updated profile', { duration: 1200 })
      } catch (e) {
        console.error(e)
        toast.error((e as Error).message)
      }
    },
    updateAuthUser: async (changes) => {
      const user = get().user
      set({ user: Object.assign(user!, changes) })
      await Promise.all([
        convex.mutation(api.users.update, changes),
        db.users.update(user!._id, changes),
      ])
    },
  }))

export const useAuthUser = () => useAuth((state) => state.user)