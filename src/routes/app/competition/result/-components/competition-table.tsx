import useResult from './useResult'
import UserAvatar from '@/components/user-avatar'
import { Medal, Star, Clock, Award } from 'lucide-react'
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

        <div className="space-y-3">
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

              <div className="text-right">
                <div className="font-bold text-foreground">{player.score}</div>
                <div className="text-xs text-muted-foreground">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Achievements Section */}
      <div className="space-y-6">
        <div className="px-6 py-3 bg-secondary/5 rounded-lg border-l-4 border-secondary flex items-center gap-3">
          <Star className="h-5 w-5 text-secondary" />
          <h5 className="font-semibold text-secondary">Special Achievements</h5>
        </div>

        <div className="space-y-6">
          {/* Highest Round/Questions Achievement */}
          <div className="space-y-3">
            <div className="px-4 py-2 bg-secondary/5 rounded-lg border-l-2 border-secondary flex items-center gap-2">
              <Award className="h-4 w-4 text-secondary" />
              <h6 className="font-medium text-secondary">
                {mode === 'flow' ? 'Highest Round' : 'Most Questions'}
              </h6>
            </div>
            {mode === 'flow' && result.flow.bestRound && (
              <AchievementCard
                type="rounds"
                username={result.flow.bestRound.username}
                round={result.flow.bestRound.round}
                avgTime={result.flow.bestRound.avgTime}
                score={result.flow.bestRound.score}
              />
            )}
            {mode === 'rapid' && result.rapid.bestRound && (
              <AchievementCard
                type="questions"
                username={result.rapid.bestRound.username}
                questions={result.rapid.bestRound.questions}
                avgTime={result.rapid.bestRound.avgTime}
                score={result.rapid.bestRound.score}
              />
            )}
          </div>

          {/* Best Time Achievement */}
          <div className="space-y-3">
            <div className="px-4 py-2 bg-secondary/5 rounded-lg border-l-2 border-secondary flex items-center gap-2">
              <Clock className="h-4 w-4 text-secondary" />
              <h6 className="font-medium text-secondary">Fastest Average Time</h6>
            </div>
            {result[mode].bestAvgTime && (
              <AchievementCard
                type="speed"
                username={result[mode].bestAvgTime.username}
                avgTime={result[mode].bestAvgTime.avgTime}
                score={result[mode].bestAvgTime.score}
                round={mode === 'flow' ? result[mode].bestAvgTime.round : undefined}
                questions={mode === 'rapid' ? result[mode].bestAvgTime.questions : undefined}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompetitionTable
