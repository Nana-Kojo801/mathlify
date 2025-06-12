import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Gamepad2, User, Eye, TrendingUp } from 'lucide-react'
import FriendsList from './-components/friends-list'
import RecentGames from './-components/recent-games'
import OverviewTab from './-components/overview-tab'
import StatisticsTab from './-components/statistics-tab'
import ProfileHeader from './-components/profile-header'
import { z } from 'zod'

const searchSchema = z.object({
  tab: z
    .union([
      z.literal('overview'),
      z.literal('statistics'),
      z.literal('games'),
      z.literal('friends'),
    ])
    .default('overview'),
})

export const Route = createFileRoute('/app/profile/')({
  component: ProfilePage,
  validateSearch: searchSchema,
})

function ProfilePage() {
  const searchParams = Route.useSearch()
  const navigate = useNavigate({ from: '/app/profile' })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'statistics', label: 'Statistics', icon: TrendingUp },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'friends', label: 'Friends', icon: User },
  ]

  const renderTabContent = () => {
    switch (searchParams.tab) {
      case 'overview':
        return <OverviewTab />
      case 'statistics':
        return <StatisticsTab />
      case 'games':
        return <RecentGames />
      case 'friends':
        return <FriendsList all />
      default:
        return <OverviewTab />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <ProfileHeader />

      {/* Tab Navigation */}
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="flex overflow-x-auto px-4 sm:px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() =>
                  navigate({
                    search: {
                      tab: tab.id as z.infer<typeof searchSchema>['tab'],
                    },
                  })
                }
                className={`flex items-center gap-2 px-4 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  searchParams.tab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <Icon className="size-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-6">{renderTabContent()}</div>
    </div>
  )
}
