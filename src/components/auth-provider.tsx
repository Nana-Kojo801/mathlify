import type { User } from '@/types'
import { api } from '@convex/_generated/api'
import { useConvex, useMutation } from 'convex/react'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'sonner'
import type { z } from 'zod'
import type { authSchema } from './auth-form'
import { useNetworkState } from 'react-use'
import { db } from '@/lib/dexie'
import { registerFriendMessagesSync } from '@/stores/friend-messages-store'
import { registerFriendsStore } from '@/stores/friends-store'

export type AuthContextType = {
  user: User | null
  loading: boolean
  authenticated: boolean
  signup: (values: z.infer<typeof authSchema>) => Promise<boolean>
  login: (values: z.infer<typeof authSchema>) => Promise<boolean>
  updateAuthUser: (changes: Partial<User>) => Promise<void>
  editProfile: (
    values: z.infer<typeof authSchema> & {
      avatar: File | null
    },
  ) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const SESSION_KEY = 'mathlify-session'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const convex = useConvex()
  const generateUrl = useMutation(api.upload.generateUploadUrl)
  const updateUser = useMutation(api.users.update)
  const { online } = useNetworkState()

  const signup = useCallback(
    async (values: z.infer<typeof authSchema>) => {
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
        setUser(newUser)
        setAuthenticated(true)
        registerFriendMessagesSync(convex, newUser._id, newUser.friends, online ?? false)
        return true
      } catch (e) {
        toast.error('Something went wrong. Try again later')
        return true
      }
    },
    [convex, online],
  )

  const login = useCallback(
    async (values: z.infer<typeof authSchema>) => {
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
        setUser(existingUser)
        setAuthenticated(true)
        registerFriendMessagesSync(convex, existingUser._id, existingUser.friends, online ?? false)
        return true
      } catch {
        toast.error('Something went wrong. Try again later')
        return false
      }
    },
    [convex, online],
  )

  const editProfile = useCallback(
    async (values: z.infer<typeof authSchema> & { avatar: File | null }) => {
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
          const postUrl = await generateUrl()
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
        setUser(Object.assign(user!, { ...values, avatar: newAvatar }))
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
    [user, convex],
  )

  const updateAuthUser = useCallback(async (changes: Partial<User>) => {
    setUser(Object.assign(user!, changes))
    await Promise.all([
      updateUser({ userId: user!._id, ...changes }),
      db.users.update(user!._id, changes),
    ])
  }, [])

  const getUser = async () => {
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

  useEffect(() => {
    const init = async () => {
      try {
        const user = await getUser()
        if (!user) {
          setLoading(false)
          setAuthenticated(false)
          return
        }
        setUser(user)
        setAuthenticated(true)
        registerFriendMessagesSync(convex, user._id, user.friends, online ?? false)
        registerFriendsStore(convex, user, online ?? false)
        setLoading(false)
      } catch(e) {
        console.error(e)
        setLoading(false)
        setAuthenticated(false)
        toast.error('An error occured')
      }
    }
    init()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, loading, authenticated, signup, login, editProfile, updateAuthUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    console.error('Use auth in auth context')
  }

  return context!
}

export default AuthProvider
