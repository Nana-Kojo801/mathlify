import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/user'
import { Link } from '@tanstack/react-router'
import { Zap, Gamepad2, Target } from 'lucide-react'

const FlowMode = () => {
  return (
    <div className="bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center">
            <Gamepad2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Casual Mode</h3>
            <span className="text-xs text-muted-foreground">Fast-paced competitive matches</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-green-600">143 active</div>
          <div className="text-xs text-muted-foreground">players</div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-muted-foreground">Your Rating</span>
        <span className="text-sm font-medium">1,247 ELO</span>
      </div>

      <Link to="/app/online/match" search={{ mode: 'flow' }}>
        <Button className="w-full h-10 font-medium">Find Flow Match</Button>
      </Link>
    </div>
  )
}

const RapidMode = () => {
  const user = useUser()
  const activeUsers = 0
  
  return (
    <div className="bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary/15 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-medium">Speed Challenge</h3>
            <span className="text-xs text-muted-foreground">Relaxed gameplay, perfect for practice</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-green-600">{activeUsers} active</div>
          <div className="text-xs text-muted-foreground">players</div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-muted-foreground">Your Rating</span>
        <span className="text-sm font-medium">{user.elo.rapid} ELO</span>
      </div>

      <Button
        
        className="w-full h-10 font-medium bg-secondary hover:bg-secondary/90 text-secondary-foreground"
      >
        Find rapid match
      </Button>
    </div>
  )
}

const MatchmakingTab = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <Zap className="text-primary w-4 h-4" />
          Quick Match
        </h2>
        <p className="text-sm text-muted-foreground">
          Get matched with players of similar skill level instantly
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">
          Choose Your Mode
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FlowMode />
          <RapidMode />
        </div>
      </div>
    </div>
  )
}

export default MatchmakingTab
