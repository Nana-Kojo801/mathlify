import {
  createContext,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'
import { useNetworkState } from 'react-use'
import { useConvex } from 'convex/react'
import { syncFriendMessages } from '@/stores/friend-messages-store'
import { syncFriends } from '@/stores/friends-store'
import { createAuthStore, type AuthStoreType } from '@/stores/auth-store'
import { useStore } from 'zustand'

export interface AppContextType {
  auth: ReturnType<typeof createAuthStore>
  init: () => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export default function AppWrapper({ children }: PropsWithChildren) {
  const convex = useConvex()
  const { online } = useNetworkState()
  const [auth] = useState(createAuthStore(convex, online ?? false))
  const [initialized, setInitialized] = useState(false)

  const sync = useCallback(async () => {
    const authState = auth.getState()
    if(!authState.user) return
    try {
      await Promise.all([
        syncFriendMessages({ user: authState.user!, online: online ?? false, convex }),
        syncFriends({ user: authState.user!, online: online ?? false, convex }),
      ])
      console.log('[SYNCING INFO]: SUCCESS')
    } catch (e) {
      console.log('[SYNCING INFO]: ERROR')
    }
  }, [auth, online])

  const init = useCallback(async () => {
    if(initialized) return
    try {
      await auth.getState().init()
      await sync()
      setInitialized(true)
      console.log('[APP]: INITIALIZED');
    } catch (e) {
      setInitialized(false)
      console.log('[APP]: AN ERROR OCCURRED')
    }
  }, [auth, sync, initialized])

  return <AppContext.Provider value={{ auth, init }}>{children}</AppContext.Provider>
}

export function useAuth<T>(selector: (store: AuthStoreType) => T) {
  const appContext = useContext(AppContext)

  if(!appContext) {
    throw new Error('useAuth must be used within AppWrapper')
  }
  return useStore(appContext.auth, selector)
}

export function useApp() {
  const appContext = useContext(AppContext)

  if (!appContext) {
    throw new Error('useApp must be used within AppWrapper')
  }

  return appContext
}