import useResult from './useResult'
import UserAvatar from '@/components/user-avatar'
import { Medal, Star } from 'lucide-react'
import type { GameType } from '@/types'
import AchievementCard from './achievement-card'

const CompetitionTable = ({ mode }: { mode: GameType }) => {
  const result = useResult()

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-foreground px-2">
        Competition Leaderboard
      </h4>

      {/* Top Players Section */}
      <div className="space-y-4">
        <div className="px-6 py-3 bg-primary/5 rounded-lg border-l-4 border-primary flex items-center gap-3">
          <Medal className="h-5 w-5 text-primary" />
          <h5 className="font-semibold text-primary">Top Players</h5>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {result[mode].topPlayers.map((player) => (
            <div
              key={`top-${player.username}`}
              className="flex items-center justify-between p-4 bg-background rounded-lg border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    player.rank === 1
                      ? 'bg-yellow-500 text-yellow-900'
                      : player.rank === 2
                        ? 'bg-gray-400 text-gray-900'
                        : player.rank === 3
                          ? 'bg-amber-600 text-amber-100'
                          : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {player.rank}
                </div>
                <div className="flex items-center gap-3">
                  <UserAvatar
                    username={player.username}
                    avatar={player.avatar}
                    className="size-8"
                  />
                  <div>
                    <div className="font-medium text-foreground">
                      {player.username}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {mode === 'flow' && 'round' in player
                        ? `Round ${player.round}`
                        : mode === 'rapid' && 'questions' in player
                          ? `Questions ${player.questions}`
                          : ''} • {''}
                      {player.avgTime}s avg
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right min-w-[80px]">
                <div className="font-bold text-foreground">{player.score}</div>
                <div className="text-xs text-muted-foreground">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Achievements Section */}
      <div className="space-y-4">
        <div className="px-6 py-3 bg-secondary/5 rounded-lg border-l-4 border-secondary flex items-center gap-3">
          <Star className="h-5 w-5 text-secondary" />
          <h5 className="font-semibold text-secondary">Special Achievements</h5>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mode === 'flow' && (
            <AchievementCard
              type="rounds"
              username={result.flow.bestRound.username}
              round={result.flow.bestRound.round}
              avgTime={result.flow.bestRound.avgTime}
              score={result.flow.bestRound.score}
            />
          )}
          {mode === 'rapid' && (
            <AchievementCard
              type="questions"
              username={result.rapid.bestRound.username}
              questions={result.rapid.bestRound.questions}
              avgTime={result.rapid.bestRound.avgTime}
              score={result.rapid.bestRound.score}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CompetitionTable
