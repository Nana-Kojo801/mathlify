import { Award, Brain, Zap } from 'lucide-react'

function ActivityItem({
  type,
  mode,
  result,
  change,
  date,
}: {
  type: string
  mode?: string
  result?: string
  change?: string
  date: string
}) {
  return (
    <div className="flex items-center justify-between p-2 sm:p-3 bg-card/60 backdrop-blur-sm rounded-lg border border-border/50">
      <div className="flex items-center space-x-2 sm:space-x-3">
        {type === 'game' ? (
          mode === 'casual' ? (
            <Brain className="w-5 h-5 text-primary" />
          ) : (
            <Zap className="w-5 h-5 text-secondary" />
          )
        ) : (
          <Award className="w-5 h-5 text-yellow-500" />
        )}
        <div>
          <p className="text-sm sm:text-base font-medium">
            {type === 'game' ? `${result} ${mode} game` : `Earned achievement`}
          </p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </div>
      {change && (
        <span
          className={`text-sm font-medium ${
            change.startsWith('+') ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {change}
        </span>
      )}
    </div>
  )
}

const RecentActivity = () => {
  const profileData = {
    username: 'MathMaster42',
    avatar: '/default-avatar.png',
    stats: {
      casualElo: 1420,
      speedElo: 1560,
      joinDate: 'Jan 2023',
    },
    leaderboards: {
      casual: { rank: 42 },
      speed: { rank: 28 },
    },
    achievements: [
      { id: 1, title: 'Novice Solver', earned: true },
      { id: 2, title: 'Speed Demon', earned: true },
      { id: 3, title: 'Marathon Runner', earned: true },
      { id: 4, title: 'Accuracy Master', earned: false },
    ],
    recentActivity: [
      {
        type: 'game',
        mode: 'casual',
        result: 'Won',
        change: '+15 ELO',
        date: '2h ago',
      },
      {
        type: 'game',
        mode: 'speed',
        result: 'Lost',
        change: '-8 ELO',
        date: '5h ago',
      },
    ],
  }
  return (
    <div className="mb-6">
      <h2 className="text-lg sm:text-xl font-bold mb-3">Recent Activity</h2>
      <div className="space-y-2">
        {profileData.recentActivity.map((activity, index) => (
          <ActivityItem
            key={index}
            type={activity.type}
            mode={activity.mode}
            result={activity.result}
            change={activity.change}
            date={activity.date}
          />
        ))}
      </div>
    </div>
  )
}

export default RecentActivity
