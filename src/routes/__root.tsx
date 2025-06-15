import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { type AuthContextType } from '@/components/auth-provider'

interface MyRouterContext {
  queryClient: QueryClient
  auth: AuthContextType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return (
      <div className="w-screen h-dvh overflow-y-auto">
        <Outlet />
        <Toaster />
      </div>
    )
  },
})
