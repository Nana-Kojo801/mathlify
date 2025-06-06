import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { type AuthContextType } from '@/components/auth-provider'
import { initSyncServerTime } from '@/stores/server-time-store'

interface MyRouterContext {
  queryClient: QueryClient
  auth: AuthContextType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    initSyncServerTime()
    return (
      <div className="w-screen h-dvh overflow-y-auto">
        <Outlet />
        <Toaster />
      </div>
    )
  },
})
