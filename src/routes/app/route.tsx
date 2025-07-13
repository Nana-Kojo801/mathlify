import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import Navigation from './-components/footer-navigation'
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
      {/* Navigation - Sidebar on desktop, footer on mobile */}
      <Navigation />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto lg:ml-20 lg:group-hover:ml-64 transition-all duration-300 ease-in-out">
        <Outlet />
      </main>
    </div>
  )
}