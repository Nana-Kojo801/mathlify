import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowLeft, Trophy, Clock, Zap, Brain, Award, BarChart2, Medal, Star } from "lucide-react"
import type { LucideIcon } from 'lucide-react'

interface UserStats {
  rank: number
  score: number
  round: number
  avgTime: number
  totalPlayers: number
}

interface Player {
  username: string
  score: number
  round: number
  avgTime: number
}

interface GameModeData {
  topPlayers: Player[]
  bestAvgTime: Player
  bestRound?: Player
  bestQuestions?: Player
}

interface CurrentUser {
  username: string
  flowStats: UserStats
  rapidStats: UserStats
}

interface Achievement {
  title: string
  icon: React.ReactNode
  player: Player
  stat: {
    label: string
    value: string | number
  }
}

interface UserAvatarProps {
  username: string
  className?: string
}

// Mock UserAvatar component
const UserAvatar = ({ username, className }: UserAvatarProps): React.ReactElement => (
  <div
    className={`rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold ${className}`}
  >
    {username.charAt(0).toUpperCase()}
  </div>
)

export const Route = createFileRoute("/app/competition/result/$id")({
  component: ResultPage,
})

function ResultPage() {
  const currentUser: CurrentUser = {
    username: "YourUsername",
    flowStats: {
      rank: 7,
      score: 1850,
      round: 9,
      avgTime: 2.9,
      totalPlayers: 156,
    },
    rapidStats: {
      rank: 12,
      score: 1420,
      round: 11,
      avgTime: 1.8,
      totalPlayers: 143,
    },
  }

  const flowData: GameModeData = {
    topPlayers: [
      { username: "MathMaster", score: 2450, round: 12, avgTime: 2.4 },
      { username: "NumberNinja", score: 2300, round: 11, avgTime: 2.6 },
      { username: "CalcChamp", score: 2150, round: 10, avgTime: 2.8 },
    ],
    bestAvgTime: {
      username: "QuickThinker",
      score: 1950,
      round: 9,
      avgTime: 1.9,
    },
    bestRound: {
      username: "EnduranceKing",
      score: 2050,
      round: 13,
      avgTime: 3.1,
    },
  }

  const rapidData: GameModeData = {
    topPlayers: [
      { username: "FastFred", score: 1800, round: 15, avgTime: 1.2 },
      { username: "SpeedyGonzales", score: 1750, round: 14, avgTime: 1.3 },
      { username: "VelocityVera", score: 1700, round: 13, avgTime: 1.4 },
    ],
    bestAvgTime: {
      username: "BlinkBlitz",
      score: 1600,
      round: 12,
      avgTime: 0.9,
    },
    bestQuestions: {
      username: "AccuracyAce",
      score: 1650,
      round: 16,
      avgTime: 1.5,
    },
  }

  interface UserPerformanceProps {
    userStats: UserStats
    isRapid?: boolean
  }

  const UserPerformance: React.FC<UserPerformanceProps> = ({ userStats, isRapid = false }) => {
    const getRankColor = (rank: number): string => {
      if (rank <= 3) return "text-yellow-600"
      if (rank <= 10) return "text-green-600"
      if (rank <= 25) return "text-blue-600"
      return "text-muted-foreground"
    }

    const getRankBg = (rank: number): string => {
      if (rank <= 3) return "bg-yellow-500/10"
      if (rank <= 10) return "bg-green-500/10"
      if (rank <= 25) return "bg-blue-500/10"
      return "bg-muted/10"
    }

    return (
      <div className={`p-4 rounded-lg ${getRankBg(userStats.rank)} border border-border/50`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <UserAvatar username={currentUser.username} className="h-10 w-10" />
            <div>
              <span className="text-base font-medium">{currentUser.username}</span>
              <div className="text-sm text-muted-foreground">
                Rank #{userStats.rank} of {userStats.totalPlayers}
              </div>
            </div>
          </div>
          <div className={`text-2xl font-bold ${getRankColor(userStats.rank)}`}>#{userStats.rank}</div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-background/50 rounded-md">
            <div className="font-bold text-lg">{userStats.score}</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
          <div className="text-center p-3 bg-background/50 rounded-md">
            <div className="font-bold text-lg">{userStats.round}</div>
            <div className="text-sm text-muted-foreground">{isRapid ? "Questions" : "Round"}</div>
          </div>
          <div className="text-center p-3 bg-background/50 rounded-md">
            <div className="font-bold text-lg">{userStats.avgTime}s</div>
            <div className="text-sm text-muted-foreground">Avg Time</div>
          </div>
        </div>
      </div>
    )
  }

  interface TopPerformersProps {
    players: Player[]
  }

  const TopPerformers: React.FC<TopPerformersProps> = ({ players }) => {
    const medals = [
      { icon: <Trophy className="h-5 w-5 text-yellow-500" />, color: "bg-yellow-500/10" },
      { icon: <Medal className="h-5 w-5 text-slate-400" />, color: "bg-slate-400/10" },
      { icon: <Medal className="h-5 w-5 text-amber-600" />, color: "bg-amber-600/10" },
    ] as const

    return (
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Top Performers
        </h3>
        <div className="space-y-3">
          {players.map((player, index) => (
            <div key={player.username} className={`flex items-center justify-between p-4 rounded-lg ${medals[index]?.color ?? ""}`}>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background shadow-sm">
                  {medals[index]?.icon}
                </div>
                <div className="flex items-center gap-3">
                  <UserAvatar username={player.username} className="h-8 w-8" />
                  <span className="text-base font-medium">{player.username}</span>
                </div>
              </div>
              <div className="font-bold text-lg">{player.score}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  interface SpecialAchievementsProps {
    achievements: Achievement[]
  }

  const SpecialAchievements: React.FC<SpecialAchievementsProps> = ({ achievements }) => (
    <div>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Star className="h-5 w-5 text-primary" />
        Special Achievements
      </h3>
      <div className="space-y-3">
        {achievements.map((achievement) => (
          <div key={`${achievement.player.username}-${achievement.title}`} className="flex items-center justify-between p-4 rounded-lg bg-muted/10">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background shadow-sm">
                {achievement.icon}
              </div>
              <div className="flex items-center gap-3">
                <UserAvatar username={achievement.player.username} className="h-8 w-8" />
                <div>
                  <span className="text-base font-medium">{achievement.player.username}</span>
                  <div className="text-sm text-muted-foreground">{achievement.title}</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">{achievement.stat.value}</div>
              <div className="text-sm text-muted-foreground">{achievement.stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  interface GameModeSectionProps {
    title: string
    icon: LucideIcon
    data: GameModeData
    userStats: UserStats
    isRapid?: boolean
  }

  const GameModeSection: React.FC<GameModeSectionProps> = ({ title, icon: Icon, data, userStats, isRapid = false }) => {
    const achievements: Achievement[] = [
      {
        title: "Fastest Solver",
        icon: <Clock className="h-5 w-5 text-primary" />,
        player: data.bestAvgTime,
        stat: {
          label: "Avg Time",
          value: `${data.bestAvgTime.avgTime}s`,
        },
      },
      {
        title: isRapid ? "Most Questions" : "Highest Round",
        icon: isRapid ? <BarChart2 className="h-5 w-5 text-primary" /> : <Award className="h-5 w-5 text-primary" />,
        player: isRapid ? data.bestQuestions! : data.bestRound!,
        stat: {
          label: isRapid ? "Questions" : "Round",
          value: isRapid ? data.bestQuestions!.round : data.bestRound!.round,
        },
      },
    ]

    return (
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        <div className="space-y-6">
          <UserPerformance userStats={userStats} isRapid={isRapid} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TopPerformers players={data.topPlayers} />
            <SpecialAchievements achievements={achievements} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b border-border/50 px-4 shadow-sm">
        <div className="flex items-center h-16">
          <Link to="/app/competition" className="flex items-center gap-2 text-primary hover:opacity-80 transition-all">
            <ArrowLeft className="size-[22px]" />
            <span className="text-xl font-bold">Results</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 w-full">
        <div className="w-full">
          <GameModeSection
            title="Flow Mode"
            icon={Brain}
            data={flowData}
            userStats={currentUser.flowStats}
          />
          <GameModeSection
            title="Rapid Mode"
            icon={Zap}
            data={rapidData}
            userStats={currentUser.rapidStats}
            isRapid
          />
        </div>
      </main>
    </div>
  )
}
