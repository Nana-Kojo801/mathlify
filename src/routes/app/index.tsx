import { createFileRoute } from '@tanstack/react-router'
import Logo from '@/logo.svg'
import Rankings from './-components/rankings'
import QuickActions from './-components/quick-actions'
import FriendsList from './-components/friends-list'
import RecentActivities from './-components/recent-activities'

export const Route = createFileRoute('/app/')({
  component: AppDashboard,
})

function AppDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={Logo} className="size-10" alt="Mathlify Logo" />
            <span className="text-xl font-bold text-primary">Mathlify</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col gap-3">
        {/* ELO Rankings */}
        <Rankings />

        {/* Quick Actions */}
        <QuickActions />

        {/* Friends List */}
        <FriendsList />

        {/* Recent Activity */}
        <RecentActivities />
      </main>
    </div>
  )
}
