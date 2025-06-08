import { Trophy, Target, Clock, ChevronRight, Users } from 'lucide-react'
import UserAvatar from '@/components/user-avatar'
import { useRapidEntries } from '../hooks'

const OtherPlayers = () => {
  const entries = useRapidEntries()

  const otherPlayers = entries.slice(3, 10)
  
  if (otherPlayers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-muted/10 flex items-center justify-center mb-3">
          <Users className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-1">No Other Players Yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Be the first to join the competition and start climbing the ranks!
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-card/50 font-medium text-sm text-muted-foreground border-b border-border/20">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">Player</div>
          <div className="col-span-2 flex justify-end items-center gap-1">
            <Trophy className="h-3.5 w-3.5" />
            <span>Score</span>
          </div>
          <div className="col-span-2 flex justify-end items-center gap-1">
            <Target className="h-3.5 w-3.5" />
            <span>Round</span>
          </div>
          <div className="col-span-2 flex justify-end items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Time</span>
          </div>
        </div>

        {otherPlayers.map((player, index) => {
          const rank = index + 4 // Start from 4 since we're showing players after the top 3
          return (
            <div
              key={player.userId}
              className="grid grid-cols-12 gap-4 items-center px-5 py-3 hover:bg-muted/5 transition-colors border-b border-border/10 last:border-0 group"
            >
              <div className="col-span-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
                    rank <= 10
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted/40 text-muted-foreground'
                  }`}
                >
                  {rank}
                </div>
              </div>

              <div className="col-span-5 flex items-center gap-3 min-w-0">
                <UserAvatar
                  username={player.username}
                  avatar={player.avatar}
                  className="w-9 h-9 border border-border/20 group-hover:border-primary/30 transition-colors"
                />
                <span className="font-medium truncate">{player.username}</span>
              </div>

              <div className="col-span-2 flex justify-end items-center gap-2 font-medium">
                <Trophy className="h-4 w-4 text-yellow-500/80" />
                <span>{player.score}</span>
              </div>

              <div className="col-span-2 flex justify-end items-center gap-2 font-medium">
                <Target className="h-4 w-4 text-blue-500/80" />
                <span>{player.questions}</span>
              </div>

              <div className="col-span-2 flex justify-end items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{player.avgTime}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        {otherPlayers.map((player, index) => {
          const rank = index + 4
          return (
            <div
              key={player.userId}
              className="relative px-4 py-3 hover:bg-muted/5 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      rank <= 10
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted/40 text-muted-foreground'
                    }`}
                  >
                    {rank}
                  </div>
                  <UserAvatar
                    username={player.username}
                    avatar={player.avatar}
                    className="w-8 h-8 border border-border/20"
                  />
                  <div className="font-medium truncate max-w-[140px]">
                    {player.username}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-yellow-500/80" />
                  <span>{player.score}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-blue-500/80" />
                  <span>{player.questions}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{player.avgTime}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default OtherPlayers
