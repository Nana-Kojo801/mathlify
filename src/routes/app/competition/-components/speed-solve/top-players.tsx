import { Medal, Crown } from 'lucide-react'
import { useCompetition } from '../useCompetition'
import UserAvatar from '@/components/user-avatar'

const PlayerCard = ({ player, rank }: { 
  player: { 
    username: string
    avatar: string
    score: number
    questions: number
    avgTime: number
  }
  rank: number
}) => {
  return (
    <div
      className="relative flex items-center gap-3 rounded-lg border border-border/60 p-3 bg-background/80 hover:bg-muted/20 transition-all hover:shadow-sm"
    >
      {/* Enhanced rank indicator */}
      <div
        className={`absolute top-0 left-3 -translate-y-1/2 flex items-center justify-center rounded-full w-6 h-6 ${
          rank === 1
            ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-[0_1px_4px_rgba(234,179,8,0.3)]'
            : rank === 2
              ? 'bg-gradient-to-br from-slate-300 to-slate-400'
              : 'bg-gradient-to-br from-amber-600 to-amber-700'
        }`}
      >
        {rank === 1 ? (
          <Crown className="h-3 w-3 fill-white text-white" />
        ) : rank === 2 ? (
          <Medal className="h-3 w-3 fill-white text-white" />
        ) : (
          <Medal className="h-3 w-3 fill-white text-white" />
        )}
      </div>

      {/* Enhanced avatar */}
      <UserAvatar
        username={player.username}
        avatar={player.avatar}
        className="h-12 w-12 border border-border/40 rounded-full grid place-content-center shadow-sm"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <div
            className={`font-medium truncate ${
              rank === 1
                ? 'text-yellow-600'
                : rank === 2
                  ? 'text-slate-600'
                  : 'text-amber-700'
            }`}
          >
            {player.username}
          </div>
        </div>

        {/* Enhanced stats display */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-sm">
          <div className="flex items-center">
            <span className="text-xs text-muted-foreground mr-1">
              Score:
            </span>
            <span className="font-medium text-foreground">
              {player.score}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-muted-foreground mr-1">
              Questions:
            </span>
            <span className="font-medium text-foreground">
              {player.questions}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-muted-foreground mr-1">
              Time:
            </span>
            <span className="font-medium text-foreground">
              {player.avgTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const TopPlayers = () => {
  const competition = useCompetition()

  const players = competition.entries.speedSolve.slice(0, 3)

  return (
    <div className="py-3 border-b border-border/40">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {players.map((player, index) => (
          <PlayerCard
            key={player.userId}
            player={player}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  )
}

export default TopPlayers
