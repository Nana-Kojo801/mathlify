import { useUser } from '@/hooks/user'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/user-avatar'
import { api } from '@convex/_generated/api'
import { useMutation } from 'convex/react'
import { useActiveRapidMatch, useRapidQueueStatus } from '../hooks'
import { useActions } from '@/components/game-modes/rapid-game/rapid-game-store'

const FindRapidMatch = ({
  setRapidState,
}: {
  setRapidState: React.Dispatch<React.SetStateAction<'searching' | 'playing'>>
}) => {
  const user = useUser()
  const queueStatus = useRapidQueueStatus()
  const match = useActiveRapidMatch()
  const { init } = useActions()

  const startSearch = useMutation(api.matchmaking.startSearch)

  useEffect(() => {
    if (!match) return
    if (match.status === 'countdown') {
      init(
        {
          duration: 60,
          quantity: { min: 5, max: 10 },
          range: { min: 1, max: 9 },
        },
        'countdown',
      )
      setRapidState('playing')
    }
  }, [match])

  useEffect(() => {
    console.log('starting search');
    startSearch({ userId: user._id })
  }, [])

  const handleTryAgain = () => {
    startSearch({ userId: user._id })
  }

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-background">
      {queueStatus && queueStatus.isSearching && !match && (
        <>
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-center mb-2">
            Finding a rapid Match
          </h2>
          <p className="text-muted-foreground text-center">
            Searching for players with similar skill level...
          </p>
        </>
      )}
      {queueStatus && !queueStatus.isSearching && !match && (
        <>
          <h2 className="text-xl font-semibold text-center mb-4">
            Opponent Not Found
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            We couldn't find a suitable opponent. Please try again.
          </p>
          <Button onClick={handleTryAgain} className="mx-auto block">
            Try Again
          </Button>
        </>
      )}{' '}
      {match && (
        <div className="text-center animate-fadeIn">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Match Found!
          </h2>
          <div className="flex items-center justify-center gap-16">
            <div className="flex flex-col items-center">
              <UserAvatar
                avatar={match.player1.avatar}
                username={match.player1.username}
                className="w-28 h-28 mb-4 relative"
              />
              <span className="text-xl font-bold">
                {match.player1.username}
              </span>
              <span className="text-muted-foreground font-medium">
                Elo: {match.player1.elo}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-primary">VS</span>
            </div>{' '}
            <div className="flex flex-col items-center">
              <UserAvatar
                username={match.player2.username}
                avatar={match.player2.avatar}
                className="w-28 h-28 mb-4 relative"
              />
              <span className="text-xl font-bold">
                {match.player2.username}
              </span>
              <span className="text-muted-foreground font-medium">
                Elo: {match.player2.elo}
              </span>
            </div>
          </div>
        </div>
      )}{' '}
    </div>
  )
}

export default FindRapidMatch
