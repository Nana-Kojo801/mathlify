import { useUser } from '@/hooks/user'
import { Brain, Trophy, Zap } from 'lucide-react'

const QuickStats = () => {
    const user = useUser()
  return (
    <div className='flex flex-col gap-2'>
      <h3 className="text-lg font-bold flex items-center gap-2">
        <Trophy className="size-5 text-yellow-500" />
        Quick Stats
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Brain className="size-4 text-primary" />
            <span className="text-sm">Flow Elo</span>
          </div>
          <span className="text-xl font-bold text-primary">
            {user.elo.flow}
          </span>
        </div>
        <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Zap className="size-4 text-secondary" />
            <span className="text-sm">Rapid Elo</span>
          </div>
          <span className="text-xl font-bold text-secondary">
            {user.elo.rapid}
          </span>
        </div>
      </div>
    </div>
  )
}

export default QuickStats
