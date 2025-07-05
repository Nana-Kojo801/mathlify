import { Users, Sparkles, Medal } from 'lucide-react'
import PerformanceDashboard from './performance-dashboard'
import TopPlayers from './top-players'
import OtherPlayers from './other-players'
import CompetitionCta from './competition-cta'
import { useWeek } from '../hooks'

const FlowTab = () => {
  const week = useWeek()
  return (
    <>
      <PerformanceDashboard />

      {/* Competition CTA */}
      <CompetitionCta />

      {/* Professional Flattened Leaderboard */}
      <div className="mb-8 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          {/* Left Side */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-2 border-background"></div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground truncate">
                  Weekly Leaderboard
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  Week {week}
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Top performers this week</span>
              </p>
            </div>
          </div>

          {/* Right Side - Action Buttons */}
          {/* <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none h-9 bg-background/70 backdrop-blur-sm border-border/50 hover:bg-muted/50 hover:border-border/70 transition-all duration-200"
            >
              <History className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline font-medium">History</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex-1 sm:flex-none h-9 bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all duration-200"
            >
              <List className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline font-medium">View Full</span>
            </Button>
          </div> */}
        </div>

        {/* Top 3 Players */}
        <div className="mb-5">
          <TopPlayers />
        </div>

        {/* Rest of Players */}
        <div className="mb-8">
          <OtherPlayers />
        </div>

        {/* Professional CTA Section */}
        <div className="relative">
          {/* Clean top divider */}
          <div className="relative mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
            <div className="absolute top-0 right-8 w-16 h-px bg-gradient-to-r from-blue-500/60 to-purple-500/60"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FlowTab
