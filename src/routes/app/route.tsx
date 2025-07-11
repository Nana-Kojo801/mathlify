import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import FooterNavigation from './-components/footer-navigation'
import { initPresense } from '@/lib/presence'
import LoadingScreen from '../-components/loading-screen'

export const Route = createFileRoute('/app')({
  component: RouteComponent,
  pendingComponent: LoadingScreen,
  beforeLoad: async ({ context: { app } }) => {
    await app.init()
    if(!app.auth.getState().user) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  initPresense()
  return (
    <div className="w-full h-screen flex flex-col">
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
      <FooterNavigation />
    </div>
  )
}