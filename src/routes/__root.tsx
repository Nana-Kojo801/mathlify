import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { type AppContextType } from '@/components/app-wrapper'
interface MyRouterContext {
  queryClient: QueryClient
  app: AppContextType
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
