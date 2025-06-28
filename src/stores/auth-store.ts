import type { authSchema } from '@/components/auth-form'
import { useAuth } from '@/components/app-wrapper'
import { db } from '@/lib/dexie'
import type { User } from '@/types'
import { api } from '@convex/_generated/api'
import type { ConvexReactClient } from 'convex/react'
import { toast } from 'sonner'
import type { z } from 'zod'
import { createStore } from 'zustand'

export const SESSION_KEY = 'mathlify-session'

export interface AuthStoreType {
  user: User | null
  loading: boolean
  authenticated: boolean
  init: () => Promise<void>
  signup: (values: z.infer<typeof authSchema>) => Promise<boolean>
  login: (values: z.infer<typeof authSchema>) => Promise<boolean>
  updateAuthUser: (changes: Partial<User>) => Promise<void>
  editProfile: (
    values: z.infer<typeof authSchema> & {
      avatar: File | null
    },
  ) => Promise<void>
}

const getUser = async (convex: ConvexReactClient, online: boolean) => {
  const userId = localStorage.getItem(SESSION_KEY)
  if (!userId) return null
  if (online) {
    const user = (await convex.query(api.users.get, {
      id: userId as User['_id'],
    }))!
    const existingUser = await db.users.get(userId)
    if (existingUser) {
      await db.users.update(userId, user)
    } else {
      await db.users.add(user)
    }
    return user
  }
  return (await db.users.get(userId))!
}

export const createAuthStore = (convex: ConvexReactClient, online: boolean) =>
  createStore<AuthStoreType>((set, get) => ({
    user: null,
    loading: true,
    authenticated: false,
    init: async () => {
      try {
        const user = await getUser(convex, online)
        if (!user) {
          set({ loading: false, authenticated: false })
          return
        }
        set({ user, loading: false, authenticated: true })
      } catch (e) {
        console.error(e)
        set({ loading: false, authenticated: false })
        toast.error('[AUTH]: AN ERROR OCCURED')
      }
    },
    signup: async (values) => {
      try {
        const existingUser = await convex.query(api.users.getByUsername, {
          username: values.username,
        })
        if (existingUser) {
          toast.error('Username already exists', { duration: 1200 })
          return false
        }
        const newUser = await convex.mutation(api.users.insert, values)
        localStorage.setItem(SESSION_KEY, newUser._id)
        await db.users.add(newUser)
        set({ user: newUser, authenticated: true })
        return true
      } catch (e) {
        toast.error('Something went wrong. Try again later')
        return true
      }
    },
    login: async (values) => {
      try {
        const existingUser = await convex.query(api.users.getByUsername, {
          username: values.username,
        })
        if (!existingUser) {
          toast.error('Username does not exists')
          return false
        }
        if (existingUser.password !== values.password) {
          toast.error('Invalid user info')
          return false
        }
        localStorage.setItem(SESSION_KEY, existingUser._id)
        await db.users.add(existingUser)
        set({ user: existingUser, authenticated: true })
        return true
      } catch {
        toast.error('Something went wrong. Try again later')
        return false
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
        if (values.avatar) {
          const postUrl = await convex.mutation(api.upload.generateUploadUrl)
          const result = await fetch(postUrl, {
            method: 'POST',
            headers: {
              'Content-type': values.avatar.type,
            },
            body: values.avatar,
          }).then((res) => res.json())
          newAvatar = (await convex.query(api.upload.getUrl, {
            storageId: result.storageId,
          }))!
        }
        set({ user: Object.assign(user!, { ...values, avatar: newAvatar }) })
        await Promise.all([
          db.users.update(user!._id, {
            ...values,
            avatar: newAvatar,
          }),
          convex.mutation(api.users.updateProfile, {
            ...values,
            avatar: newAvatar,
            userId: user!._id,
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
        convex.mutation(api.users.update, { userId: user!._id, ...changes }),
        db.users.update(user!._id, changes),
      ])
    },
  }))

export const useAuthUser = () => useAuth((state) => state.user)

export const useAuthActions = () => useAuth(state => ({
    signup: state.signup,
    login: state.login,
    editProfile: state.editProfile,
    updateAuthUser: state.updateAuthUser
}))
