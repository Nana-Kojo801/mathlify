import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { initServerTimeSync } from '@/stores/server-time-store'
import type { AppContextType } from '@/components/app-wrapper'
import { useConvexAuth } from 'convex/react'

interface MyRouterContext {
  queryClient: QueryClient
  app: AppContextType
}

function PremiumSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="relative flex flex-col items-center">
        <span className="sr-only">Loading...</span>
        <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-lg"></div>
      </div>
    </div>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    const { isLoading } = useConvexAuth()
    initServerTimeSync()

    if(isLoading) return <PremiumSpinner />

    return (
      <div className="w-screen h-dvh overflow-y-auto">
        <Outlet />
        <Toaster />
      </div>
    )
  },
})
