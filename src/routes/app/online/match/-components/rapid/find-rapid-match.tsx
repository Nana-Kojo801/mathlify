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
      )}
      {match && (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 animate-pulse"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-bounce" style={{ animationDelay: '1s' }}></div>
          
          {/* Main content */}
          <div className="relative z-10 w-full max-w-4xl mx-auto">
            {/* Header with enhanced styling */}
            <div className="text-center mb-8 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full mb-4 animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 animate-pulse">
                MATCH FOUND!
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto animate-pulse"></div>
            </div>

            {/* Players section with enhanced responsive design */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-12 xl:gap-20 mb-8">
              {/* Player 1 */}
              <div className="flex flex-col items-center group animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <UserAvatar
                    avatar={match.player1.avatar}
                    username={match.player1.username}
                    className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 relative z-10 border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                    {match.player1.username}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm md:text-base text-muted-foreground font-medium">
                      Elo: {match.player1.elo}
                    </span>
                  </div>
                </div>
              </div>

              {/* VS Section */}
              <div className="flex flex-col items-center justify-center animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-xl animate-pulse"></div>
                  <div className="relative z-10 bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-3 rounded-full shadow-lg">
                    <span className="text-2xl md:text-4xl lg:text-5xl font-black">VS</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-muted-foreground">Rapid Mode</span>
                  </div>
                  <div className="text-xs text-muted-foreground">60 seconds • 5-10 questions</div>
                </div>
              </div>

              {/* Player 2 */}
              <div className="flex flex-col items-center group animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <UserAvatar
                    username={match.player2.username}
                    avatar={match.player2.avatar}
                    className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 relative z-10 border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                    {match.player2.username}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm md:text-base text-muted-foreground font-medium">
                      Elo: {match.player2.elo}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom section with countdown or status */}
            <div className="text-center animate-fadeIn" style={{ animationDelay: '0.8s' }}>
              <div className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm md:text-base font-medium text-primary">
                  Preparing match...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FindRapidMatch
