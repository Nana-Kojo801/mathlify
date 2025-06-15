import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import FooterNavigation from './-components/footer-navigation'
import { useAuth } from '@/components/auth-provider'
import { initPresense } from '@/lib/presence'

export const Route = createFileRoute('/app')({
  component: RouteComponent,
})

function RouteComponent() {
  const { loading, authenticated } = useAuth()

  initPresense()

  if (!loading && !authenticated) return <Navigate to="/" />
  return (
    <div className="w-full h-screen flex flex-col">
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
      <FooterNavigation />
    </div>
  )
}
