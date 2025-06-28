import {
  Trophy,
  Brain,
  Zap,
  BarChart2,
  Gamepad2,
  Target,
  Clock,
  Award
} from 'lucide-react'
import stats from './stats'

const EloRankingsSection = () => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
        <Trophy className="size-5 text-yellow-500" />
        ELO & Rankings
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Flow Stats */}
        <div className="bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors rounded-lg p-3 sm:p-4">
          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/15 rounded-lg flex items-center justify-center">
              <Brain className="size-4 sm:size-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-foreground">Flow Mode</h4>
              <p className="text-xs text-muted-foreground">
                Rank #{stats.flowRank}
              </p>
            </div>
          </div>

          {/* Main ELO Display */}
          <div className="text-center mb-3 sm:mb-4 p-2 sm:p-3 bg-background/50 rounded-lg border border-border/30">
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">{stats.flowElo}</div>
            <div className="text-xs text-muted-foreground">Current ELO</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            <div className="text-center p-1.5 sm:p-2 bg-background/30 rounded-lg">
              <div className="text-sm sm:text-base font-bold text-foreground">{stats.peakFlowElo}</div>
              <div className="text-xs text-muted-foreground">Peak</div>
            </div>
            <div className="text-center p-1.5 sm:p-2 bg-background/30 rounded-lg">
              <div className="text-sm sm:text-base font-bold text-foreground">{stats.flowGamesPlayed}</div>
              <div className="text-xs text-muted-foreground">Games</div>
            </div>
            <div className="text-center p-1.5 sm:p-2 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-sm sm:text-base font-bold text-green-600">{stats.flowWinRate}</div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
            </div>
          </div>
        </div>

        {/* Rapid Stats */}
        <div className="bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors rounded-lg p-3 sm:p-4">
          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/15 rounded-lg flex items-center justify-center">
              <Zap className="size-4 sm:size-5 text-secondary" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-foreground">Rapid Mode</h4>
              <p className="text-xs text-muted-foreground">
                Rank #{stats.rapidRank}
              </p>
            </div>
          </div>

          {/* Main ELO Display */}
          <div className="text-center mb-3 sm:mb-4 p-2 sm:p-3 bg-background/50 rounded-lg border border-border/30">
            <div className="text-xl sm:text-2xl font-bold text-secondary mb-1">{stats.rapidElo}</div>
            <div className="text-xs text-muted-foreground">Current ELO</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            <div className="text-center p-1.5 sm:p-2 bg-background/30 rounded-lg">
              <div className="text-sm sm:text-base font-bold text-foreground">{stats.peakRapidElo}</div>
              <div className="text-xs text-muted-foreground">Peak</div>
            </div>
            <div className="text-center p-1.5 sm:p-2 bg-background/30 rounded-lg">
              <div className="text-sm sm:text-base font-bold text-foreground">{stats.rapidGamesPlayed}</div>
              <div className="text-xs text-muted-foreground">Games</div>
            </div>
            <div className="text-center p-1.5 sm:p-2 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-sm sm:text-base font-bold text-green-600">{stats.rapidWinRate}</div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
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
      <h3 className="text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
        <BarChart2 className="size-5 text-blue-500" />
        Game Performance
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        <div className="group p-3 sm:p-4 rounded-lg bg-background border border-border hover:border-primary/30 transition-all duration-300 text-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-muted/50 rounded-lg flex items-center justify-center mx-auto mb-1.5 sm:mb-2 group-hover:bg-primary/10 transition-colors">
            <Gamepad2 className="size-3 sm:size-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div className="text-sm sm:text-lg font-bold text-foreground">{stats.totalGames}</div>
          <div className="text-xs text-muted-foreground">Total Games</div>
        </div>
        
        <div className="group p-3 sm:p-4 rounded-lg bg-background border border-border hover:border-green-500/30 transition-all duration-300 text-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
            <Trophy className="size-3 sm:size-4 text-green-600" />
          </div>
          <div className="text-sm sm:text-lg font-bold text-green-600">
            {stats.totalWins}
          </div>
          <div className="text-xs text-muted-foreground">Total Wins</div>
        </div>
        
        <div className="group p-3 sm:p-4 rounded-lg bg-background border border-border hover:border-red-500/30 transition-all duration-300 text-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500/10 rounded-lg flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
            <Target className="size-3 sm:size-4 text-red-600" />
          </div>
          <div className="text-sm sm:text-lg font-bold text-red-600">
            {stats.totalLosses}
          </div>
          <div className="text-xs text-muted-foreground">Total Losses</div>
        </div>
        
        <div className="group p-3 sm:p-4 rounded-lg bg-background border border-border hover:border-green-500/30 transition-all duration-300 text-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
            <BarChart2 className="size-3 sm:size-4 text-green-600" />
          </div>
          <div className="text-sm sm:text-lg font-bold text-green-600">
            {stats.winRate}
          </div>
          <div className="text-xs text-muted-foreground">Win Rate</div>
        </div>
        
        <div className="group p-3 sm:p-4 rounded-lg bg-background border border-border hover:border-blue-500/30 transition-all duration-300 text-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
            <Clock className="size-3 sm:size-4 text-blue-600" />
          </div>
          <div className="text-sm sm:text-lg font-bold text-blue-600">
            {stats.totalPlayTime}
          </div>
          <div className="text-xs text-muted-foreground">Play Time</div>
        </div>
        
        <div className="group p-3 sm:p-4 rounded-lg bg-background border border-border hover:border-yellow-500/30 transition-all duration-300 text-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500/10 rounded-lg flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
            <Award className="size-3 sm:size-4 text-yellow-600" />
          </div>
          <div className="text-sm sm:text-lg font-bold text-yellow-600">
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
      <h3 className="text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
        <Gamepad2 className="size-5 text-purple-500" />
        Mode Breakdown
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/15 rounded-lg flex items-center justify-center">
              <Brain className="size-3 sm:size-4 text-primary" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-foreground">Flow Mode Performance</h4>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {/* Win/Loss Ratio */}
            <div className="text-center p-2 sm:p-3 bg-background/50 rounded-lg border border-border/30">
              <div className="flex justify-center items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-bold text-green-600">{stats.flowWins}</div>
                  <div className="text-xs text-muted-foreground">Wins</div>
                </div>
                <div className="text-sm sm:text-lg font-bold text-muted-foreground">/</div>
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-bold text-red-600">{stats.flowLosses}</div>
                  <div className="text-xs text-muted-foreground">Losses</div>
                </div>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-1 sm:h-1.5">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-1 sm:h-1.5 rounded-full" 
                  style={{ width: `${(stats.flowWins / (stats.flowWins + stats.flowLosses)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Win Rate Display */}
            <div className="text-center p-2 sm:p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-lg sm:text-xl font-bold text-green-600 mb-1">{stats.flowWinRate}</div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
            </div>
          </div>
        </div>

        <div className="bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-secondary/15 rounded-lg flex items-center justify-center">
              <Zap className="size-3 sm:size-4 text-secondary" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-foreground">Rapid Mode Performance</h4>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {/* Win/Loss Ratio */}
            <div className="text-center p-2 sm:p-3 bg-background/50 rounded-lg border border-border/30">
              <div className="flex justify-center items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-bold text-green-600">
                    {stats.rapidWins}
                  </div>
                  <div className="text-xs text-muted-foreground">Wins</div>
                </div>
                <div className="text-sm sm:text-lg font-bold text-muted-foreground">/</div>
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-bold text-red-600">
                    {stats.rapidLosses}
                  </div>
                  <div className="text-xs text-muted-foreground">Losses</div>
                </div>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-1 sm:h-1.5">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-1 sm:h-1.5 rounded-full" 
                  style={{ width: `${(stats.rapidWins / (stats.rapidWins + stats.rapidLosses)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Win Rate Display */}
            <div className="text-center p-2 sm:p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-lg sm:text-xl font-bold text-green-600 mb-1">{stats.rapidWinRate}</div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const StatisticsTab = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <EloRankingsSection />
      <GamePerformanceSection />
      <ModeBreakdownSection />
    </div>
  )
}

export default StatisticsTab
