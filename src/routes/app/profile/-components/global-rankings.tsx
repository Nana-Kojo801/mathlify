import type { GameType } from '@/types'
import { Link } from '@tanstack/react-router'
import { Brain, ChevronRight, Trophy, Zap } from 'lucide-react'

function RankingCard({
    mode,
    rank,
  }: {
    mode: GameType
    rank: number
  }) {
    return (
      <div className="flex items-center justify-between p-3 bg-card/40 rounded-lg">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {mode === 'flow' ? (
            <Brain className="w-5 h-5 text-primary" />
          ) : (
            <Zap className="w-5 h-5 text-secondary" />
          )}
          <span className="text-sm sm:text-base">
            {mode === 'flow' ? 'Flow' : 'Rapid'}
          </span>
        </div>
        <span className="font-medium">#{rank}</span>
      </div>
    )
  }

const GlobalRankings = () => {
  return (
    <div className="bg-card/60 backdrop-blur-sm rounded-lg border border-border/50 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold flex items-center space-x-2">
          <Trophy className="w-5 h-5" />
          <span>Global Rankings</span>
        </h2>
        <Link
          to="/app/profile"
          className="text-sm text-primary flex items-center"
        >
          View Full <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <RankingCard
          mode="flow"
          rank={1}
        />
        <RankingCard mode="rapid" rank={1} />
      </div>
    </div>
  )
}

export default GlobalRankings
