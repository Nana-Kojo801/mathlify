import { createFileRoute } from '@tanstack/react-router'
import Logo from '@/logo.svg'
import Rankings from './-components/rankings'
import QuickActions from './-components/quick-actions'
import FriendsList from './-components/friends-list'
import RecentActivities from './-components/recent-activities'
import { PageHeader } from '@/components/page-header'

export const Route = createFileRoute('/app/')({
  component: AppDashboard,
})

function AppDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <PageHeader>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={Logo} className="size-10" alt="Mathlify Logo" />
            <span className="text-xl font-bold text-primary">Mathlify</span>
          </div>
        </div>
      </PageHeader>

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
