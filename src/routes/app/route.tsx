import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import FooterNavigation from './-components/footer-navigation'
import { initPresense } from '@/lib/presence'

export const Route = createFileRoute('/app')({
  component: RouteComponent,
  beforeLoad: async ({ context: { app } }) => {
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