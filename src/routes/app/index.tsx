import { createFileRoute, Link } from '@tanstack/react-router'
import Logo from '@/logo.svg'
import Rankings from './-components/rankings'
import QuickActions from './-components/quick-actions'
import FriendsList from './-components/friends-list'
import RecentActivities from './-components/recent-activities'
import { PageHeader } from '@/components/page-header'
import { useQuery } from 'convex/react'
import { api } from '@convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'

export const Route = createFileRoute('/app/')({
  component: AppDashboard,
})

function AppDashboard() {
  const unviewedFriendRequests =
    useQuery(api.friendRequests.getUnviewedFriendRequests) || 0
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <PageHeader
        rightContent={
          <Link to="/app/friend-requests">
            <Button
              variant="ghost"
              className="relative p-3 rounded-full hover:bg-accent/50 transition-colors duration-200 group"
              size="icon"
            >
              <Bell className="size-6 text-foreground group-hover:text-primary transition-colors duration-200" />
              {unviewedFriendRequests > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-semibold px-1 shadow-lg border-2 border-background">
                  {unviewedFriendRequests > 99 ? '99+' : unviewedFriendRequests}
                </span>
              )}
            </Button>
          </Link>
        }
      >
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
