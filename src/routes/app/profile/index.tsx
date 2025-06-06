import { createFileRoute } from '@tanstack/react-router'
import ProfileHeader from './-components/profile-header'
import Stats from './-components/stats'
import GlobalRankings from './-components/global-rankings'
import RecentActivity from './-components/recent-activity'

export const Route = createFileRoute('/app/profile/')({
  component: ProfilePage,
})

function ProfilePage() {

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <span className="text-xl font-bold text-primary">Profile</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-4 sm:px-6">
        <ProfileHeader />
        <Stats />
        <GlobalRankings />
        <RecentActivity />
      </main>
    </div>
  )
}