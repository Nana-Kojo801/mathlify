import { Crown, Target, Timer, Trophy } from 'lucide-react'
import useResult from './useResult'
import type { GameType } from '@/types'

const StatsOverview = ({ mode }: { mode: GameType }) => {
  const result = useResult()
  if (!result[mode].userPerformance) return null
  return (
    <div className="space-y-6">
      <div className="px-6 py-3 bg-primary/5 rounded-lg border-l-4 border-primary flex items-center gap-3">
        <Crown className="h-5 w-5 text-primary" />{' '}
        <h5 className="font-semibold text-primary">
          Your {mode} Performance
          <span className="text-muted-foreground font-normal text-sm ml-2">
            (Ranked #{result[mode].userPerformance.rank} out of{' '}
            {result[mode].totalPlayers} players)
          </span>
        </h5>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center justify-between p-4 bg-background rounded-lg border hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-primary/10 text-primary">
              <Trophy className="h-5 w-5" /> {/* Icon for Score */}
            </div>
            <div>
              <div className="font-medium text-foreground">Score</div>
              <div className="text-sm text-muted-foreground">
                Overall Performance
              </div>
            </div>
          </div>
          <div className="text-right min-w-[80px]">
            <div className="font-bold text-foreground">
              {result[mode].userPerformance.score}
            </div>
            <div className="text-xs text-muted-foreground">points</div>
          </div>
        </div>

        {/* Rounds/Questions Card */}
        <div className="flex items-center justify-between p-4 bg-background rounded-lg border hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-primary/10 text-primary">
              <Target className="h-5 w-5" /> {/* Icon for Rounds/Questions */}
            </div>
            <div>
              <div className="font-medium text-foreground">
                {mode === 'rapid' ? 'Questions' : 'Rounds'}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>
          <div className="text-right min-w-[80px]">
            <div className="font-bold text-foreground">
              {mode === 'flow'
                ? result.flow.userPerformance!.round
                : result.rapid.userPerformance!.questions}
            </div>
            <div className="text-xs text-muted-foreground">
              {mode === 'rapid' ? 'questions' : 'rounds'}
            </div>
          </div>
        </div>

        {/* Average Time Card */}
        <div className="flex items-center justify-between p-4 bg-background rounded-lg border hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-primary/10 text-primary">
              <Timer className="h-5 w-5" /> {/* Icon for Avg Time */}
            </div>
            <div>
              <div className="font-medium text-foreground">Avg Time</div>
              <div className="text-sm text-muted-foreground">
                Per {mode === 'rapid' ? 'Question' : 'Round'}
              </div>
            </div>
          </div>
          <div className="text-right min-w-[80px]">
            <div className="font-bold text-foreground">
              {result[mode].userPerformance.avgTime}s
            </div>
            <div className="text-xs text-muted-foreground">average</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsOverview
