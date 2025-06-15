import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/user'
import { useConvexMutation } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { useQuery } from 'convex/react'
import { Zap, Gamepad2, Badge, Target } from 'lucide-react'
import { toast } from 'sonner'

const FlowMode = () => {
  return (
    <div className="bg-muted/10 border-2 border-primary/30 hover:border-primary/50 rounded-lg p-6 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/15 rounded-lg flex items-center justify-center">
            <Gamepad2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="text-base font-semibold">Casual Mode</h4>
            <p className="text-xs text-muted-foreground">
              Fast-paced competitive matches
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Your Rating</span>
          <Badge className="bg-primary/20 text-primary border-primary/30 font-medium">
            1,247 ELO
          </Badge>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Players in Queue
          </span>
          <span className="text-sm font-medium text-green-600">143 active</span>
        </div>
      </div>

      <Link to="/app/online/match" search={{ mode: 'flow' }}>
        <Button className="w-full h-11 font-medium">Find Flow Match</Button>
      </Link>
    </div>
  )
}

const RapidMode = () => {
  const user = useUser()
  const activeUsers = useQuery(api.queue.getRapidQueueActiveSize) || 0
  const { mutateAsync: joinQueue, isPending: joiningQueue } = useMutation({
    mutationFn: useConvexMutation(api.queue.joinRapidQueue),
    onError: () => {
      toast.error('Error occured when joining queue')
    },
  })
  const navigate = useNavigate()
  return (
    <div className="bg-muted/10 border-2 border-secondary/30 hover:border-secondary/50 rounded-lg p-6 cursor-pointer transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-secondary/15 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h4 className="text-base font-semibold">Speed Challenge</h4>
            <p className="text-xs text-muted-foreground">
              Relaxed gameplay, perfect for practice
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Your Rating</span>
          <Badge className="bg-secondary/20 text-secondary border-secondary/30 font-medium">
            {user.elo.rapid} ELO
          </Badge>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Players in Queue
          </span>
          <span className="text-sm font-medium text-green-600">
            {activeUsers} active
          </span>
        </div>
      </div>

      <Button
        disabled={joiningQueue}
        onClick={async () => {
          await joinQueue({ userId: user._id })
          navigate({ to: '/app/online/match', search: { mode: 'rapid' } })
        }}
        className="w-full h-11 font-medium bg-secondary hover:bg-secondary/90 text-secondary-foreground"
      >
        {joiningQueue && <Spinner />}
        Find Rapid Match
      </Button>
    </div>
  )
}

const MatchmakingTab = () => {
  return (
    <div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <Zap className="text-primary w-5 h-5" />
          Quick Match
        </h2>
        <p className="text-sm text-muted-foreground">
          Get matched with players of similar skill level instantly
        </p>
      </div>

      {/* Game Modes */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">
          Choose Your Mode
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Casual Mode */}
          <FlowMode />

          {/* Speed Challenge Mode */}
          <RapidMode />
        </div>
      </div>
    </div>
  )
}

export default MatchmakingTab
