import {
  Trophy,
  Brain,
  Zap,
  BarChart2,
  Gamepad2,
  Target,
  Clock,
  Award,
} from 'lucide-react'
import stats from './stats'

const EloRankingsSection = () => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Trophy className="size-6 text-yellow-500" />
        ELO & Rankings
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flow Stats */}
        <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="size-8 text-primary" />
            <div>
              <h4 className="font-bold text-lg">Flow Mode</h4>
              <p className="text-sm text-muted-foreground">
                Current Rank #{stats.flowRank}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current ELO</p>
              <p className="text-2xl font-bold text-primary">{stats.flowElo}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Peak ELO</p>
              <p className="text-2xl font-bold">{stats.peakFlowElo}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Games Played</p>
              <p className="text-xl font-bold">{stats.flowGamesPlayed}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <p className="text-xl font-bold text-green-500">
                {stats.flowWinRate}
              </p>
            </div>
          </div>
        </div>

        {/* Rapid Stats */}
        <div className="p-6 rounded-lg bg-secondary/5 border border-secondary/20">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="size-8 text-secondary" />
            <div>
              <h4 className="font-bold text-lg">Rapid Mode</h4>
              <p className="text-sm text-muted-foreground">
                Current Rank #{stats.rapidRank}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current ELO</p>
              <p className="text-2xl font-bold text-secondary">
                {stats.rapidElo}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Peak ELO</p>
              <p className="text-2xl font-bold">{stats.peakRapidElo}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Games Played</p>
              <p className="text-xl font-bold">{stats.rapidGamesPlayed}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <p className="text-xl font-bold text-green-500">
                {stats.rapidWinRate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const GamePerformanceSection = () => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <BarChart2 className="size-6 text-blue-500" />
        Game Performance
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-lg bg-background border border-border text-center">
          <Gamepad2 className="size-6 mx-auto mb-2 text-muted-foreground" />
          <div className="text-xl font-bold">{stats.totalGames}</div>
          <div className="text-xs text-muted-foreground">Total Games</div>
        </div>
        <div className="p-4 rounded-lg bg-background border border-border text-center">
          <Trophy className="size-6 mx-auto mb-2 text-green-500" />
          <div className="text-xl font-bold text-green-500">
            {stats.totalWins}
          </div>
          <div className="text-xs text-muted-foreground">Total Wins</div>
        </div>
        <div className="p-4 rounded-lg bg-background border border-border text-center">
          <Target className="size-6 mx-auto mb-2 text-red-500" />
          <div className="text-xl font-bold text-red-500">
            {stats.totalLosses}
          </div>
          <div className="text-xs text-muted-foreground">Total Losses</div>
        </div>
        <div className="p-4 rounded-lg bg-background border border-border text-center">
          <BarChart2 className="size-6 mx-auto mb-2 text-green-500" />
          <div className="text-xl font-bold text-green-500">
            {stats.winRate}
          </div>
          <div className="text-xs text-muted-foreground">Win Rate</div>
        </div>
        <div className="p-4 rounded-lg bg-background border border-border text-center">
          <Clock className="size-6 mx-auto mb-2 text-blue-500" />
          <div className="text-xl font-bold text-blue-500">
            {stats.totalPlayTime}
          </div>
          <div className="text-xs text-muted-foreground">Play Time</div>
        </div>
        <div className="p-4 rounded-lg bg-background border border-border text-center">
          <Award className="size-6 mx-auto mb-2 text-yellow-500" />
          <div className="text-xl font-bold text-yellow-500">
            {stats.achievements}
          </div>
          <div className="text-xs text-muted-foreground">Achievements</div>
        </div>
      </div>
    </div>
  )
}

const ModeBreakdownSection = () => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Gamepad2 className="size-6 text-purple-500" />
        Mode Breakdown
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-background border border-border">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <Brain className="size-5 text-primary" />
            Flow Mode Performance
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Games Won</span>
              <span className="font-bold text-green-500">{stats.flowWins}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Games Lost</span>
              <span className="font-bold text-red-500">{stats.flowLosses}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Win Rate</span>
              <span className="font-bold">{stats.flowWinRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ELO Change (Month)</span>
              <span className="font-bold text-green-500">+28</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-background border border-border">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <Zap className="size-5 text-secondary" />
            Rapid Mode Performance
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Games Won</span>
              <span className="font-bold text-green-500">
                {stats.rapidWins}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Games Lost</span>
              <span className="font-bold text-red-500">
                {stats.rapidLosses}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Win Rate</span>
              <span className="font-bold">{stats.rapidWinRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ELO Change (Month)</span>
              <span className="font-bold text-green-500">+14</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const StatisticsTab = () => {
  return (
    <div className="space-y-8">
      <EloRankingsSection />
      <GamePerformanceSection />
      <ModeBreakdownSection />
    </div>
  )
}

export default StatisticsTab
