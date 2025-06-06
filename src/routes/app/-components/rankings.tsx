import { useUser } from '@/hooks/user'
import { Brain, Zap } from 'lucide-react'

const Rankings = () => {
    const user = useUser()
  return (
    <section className="mb-6">
      <h1 className="text-2xl font-bold mb-4">Your Elo</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card/60 backdrop-blur-sm rounded-lg border border-border/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Casual Mode</p>
              <p className="text-2xl font-bold">{user.elo.casual}</p>
            </div>
            <Brain className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="bg-card/60 backdrop-blur-sm rounded-lg border border-border/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Speed Solve</p>
              <p className="text-2xl font-bold">{user.elo.speedSolve}</p>
            </div>
            <Zap className="h-6 w-6 text-secondary" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Rankings
