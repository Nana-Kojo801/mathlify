import { Trophy, Clock, BarChart2, Award } from 'lucide-react'

const AchievementCard = ({
  type,
  username,
  round,
  questions,
  avgTime,
  score,
}: {
  type: 'top' | 'speed' | 'questions' | 'rounds'
  username: string
  round?: number
  questions?: number
  avgTime: number
  score: number
}) => {
  const getTypeLabel = (type: 'top' | 'speed' | 'questions' | 'rounds') => {
    switch (type) {
      case 'top':
        return 'Top Score'
      case 'speed':
        return 'Fastest Average'
      case 'questions':
        return 'Most Questions'
      case 'rounds':
        return 'Highest Round'
      default:
        return ''
    }
  }

  const getTypeIcon = (type: 'top' | 'speed' | 'questions' | 'rounds') => {
    switch (type) {
      case 'top':
        return <Trophy className="h-5 w-5" />
      case 'speed':
        return <Clock className="h-5 w-5" />
      case 'questions':
        return <BarChart2 className="h-5 w-5" />
      case 'rounds':
        return <Award className="h-5 w-5" />
      default:
        return null
    }
  }
  return (
    <div className="flex items-center justify-between p-4 bg-background rounded-lg border hover:border-secondary/30 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/10 text-secondary shrink-0">
          {getTypeIcon(type)}
        </div>
        <div>
          <div className="font-medium text-foreground">{username}</div>
          <div className="text-sm text-muted-foreground">
            {getTypeLabel(type)} •{' '}
            {type === 'questions'
              ? `Questions ${questions}`
              : type === 'rounds' ? `Round ${round}` : ''}{' '}
            • {avgTime}s avg
          </div>
        </div>
      </div>
      <div className="text-right min-w-[80px]">
        <div className="font-bold text-foreground">{score}</div>
        <div className="text-xs text-muted-foreground">points</div>
      </div>
    </div>
  )
}

export default AchievementCard