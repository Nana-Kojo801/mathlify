import Game from '@/components/game-modes/rapid-game'
import { useActiveRapidMatch } from '../hooks'
import { useEffect, useRef, useState } from 'react'
import { DateTime } from 'luxon'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { useUser } from '@/hooks/user'
import UserAvatar from '@/components/user-avatar'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { getServerTime } from '@/stores/server-time-store'

const Countdown = () => {
  const match = useActiveRapidMatch()
  const [timer, setTimer] = useState(3)

  useEffect(() => {
    if (!match || match.status !== 'countdown') return
    const interval = setInterval(() => {
      const now = DateTime.fromMillis(getServerTime())
      const endTime = DateTime.fromMillis(match.gamePhase.endTime)
      const timeLeft = endTime.diff(now)

      const seconds = Math.ceil(timeLeft.as('seconds'))

      setTimer(seconds > 3 ? 3 : seconds)
      if (timeLeft.as('milliseconds') < 0) {
        clearInterval(interval)
        // setState('questions')
      }
    }, 100)
    return () => clearInterval(interval)
  }, [match])

  return <p className="text-5xl font-bold text-foreground">{timer}</p>
}

const Question = () => {
  const user = useUser()
  const [timer, setTimer] = useState(60)
  const match = useActiveRapidMatch()!
  const updateResult = useMutation(api.matchmaking.updateRapidResult)

  const handleCorrect = (score: number) => {
    if (timer <= 0) return
    updateResult({ userId: user._id, matchId: match._id, score })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = DateTime.fromMillis(getServerTime())
      const endTime = DateTime.fromMillis(match.gamePhase.endTime)
      const timeLeft = Math.ceil(endTime.diff(now).as('seconds'))

      setTimer(timeLeft > 60 ? 60 : timeLeft)

      if (timeLeft <= 0) {
        clearInterval(interval)
      }
    }, 100)
  }, [])

  return <Game.Questions onCorrect={handleCorrect} customTimer={timer} />
}

const Result = ({
  setRapidState,
}: {
  setRapidState: React.Dispatch<React.SetStateAction<'searching' | 'playing'>>
}) => {
  const match = useActiveRapidMatch()!
  const user = useUser()
  const deleteMatch = useMutation(api.matchmaking.deleteRapidMatch)
  const tempMatch = useRef<typeof match>(match)
  const navigate = useNavigate()

  const winner =
    tempMatch.current.gameResult.player1 > tempMatch.current.gameResult.player2
      ? tempMatch.current.player1
      : tempMatch.current.player2
  const isDraw =
    tempMatch.current.gameResult.player1 ===
    tempMatch.current.gameResult.player2

  const handleFindNext = async () => {
    await deleteMatch({ matchId: tempMatch.current._id })
    setRapidState('searching')
  }

  const handleQuit = async () => {
    await deleteMatch({ matchId: tempMatch.current._id })
    navigate({ to: '/app/online' })
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header with enhanced styling */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary to-primary/80 rounded-full mb-3">
            {isDraw ? (
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            )}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            {isDraw ? "IT'S A DRAW!" : `${winner.username.toUpperCase()} WINS!`}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto"></div>
        </div>

        {/* Players section with horizontal layout on all screens */}
        <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-12 mb-6">
          {/* Player 1 */}
          <div className="flex flex-col items-center group">
            <div className="relative mb-3">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <UserAvatar
                avatar={tempMatch.current.player1.avatar}
                username={tempMatch.current.player1.username}
                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 relative z-10 border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-105"
              />
              {/* Winner indicator */}
              {!isDraw && winner.username === user.username && (
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="text-center">
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                {tempMatch.current.player1.username}
              </h3>
              <div className="flex items-center justify-center gap-1 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm md:text-base text-muted-foreground font-medium">
                  Elo: {tempMatch.current.player1.elo}
                </span>
              </div>
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-3 border border-primary/20">
                <div className="text-xl md:text-2xl lg:text-3xl font-black text-primary">
                  {tempMatch.current.gameResult.player1}
                </div>
                <div className="text-sm text-muted-foreground font-medium">questions</div>
              </div>
            </div>
          </div>

          {/* VS Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-xl"></div>
              <div className="relative z-10 bg-gradient-to-r from-primary to-primary/80 text-white px-5 py-2.5 rounded-full shadow-lg">
                <span className="text-xl md:text-2xl lg:text-3xl font-black">VS</span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-muted-foreground">Rapid Mode</span>
              </div>
              <div className="text-sm text-muted-foreground">Match Complete</div>
            </div>
          </div>

          {/* Player 2 */}
          <div className="flex flex-col items-center group">
            <div className="relative mb-3">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <UserAvatar
                username={tempMatch.current.player2.username}
                avatar={tempMatch.current.player2.avatar}
                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 relative z-10 border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-105"
              />
              {/* Winner indicator */}
              {!isDraw && winner.username === user.username && (
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="text-center">
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                {tempMatch.current.player2.username}
              </h3>
              <div className="flex items-center justify-center gap-1 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm md:text-base text-muted-foreground font-medium">
                  Elo: {tempMatch.current.player2.elo}
                </span>
              </div>
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-3 border border-primary/20">
                <div className="text-xl md:text-2xl lg:text-3xl font-black text-primary">
                  {tempMatch.current.gameResult.player2}
                </div>
                <div className="text-sm text-muted-foreground font-medium">questions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons with enhanced styling */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <Button 
              size="default" 
              className="px-7 py-2.5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={handleFindNext}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
              Next Match
            </Button>
            <Button
              size="default"
              className="px-7 py-2.5 bg-gradient-to-r from-muted/20 to-muted/10 hover:from-muted/30 hover:to-muted/20 text-foreground font-semibold border border-muted/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              variant="outline"
              onClick={handleQuit}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Quit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Play = ({
  setRapidState,
}: {
  setRapidState: React.Dispatch<React.SetStateAction<'searching' | 'playing'>>
}) => {
  const match = useActiveRapidMatch()

  return (
    <Game.RapidGameLayout>
      <Game.RapidGame
        custom={['countdown', 'questions']}
        quitTo={{ to: '/app/online' }}
      >
        {' '}
        {match?.status === 'countdown' && <Countdown />}
        {match?.status === 'questions' && <Question />}
        {(!match || match?.status === 'result') && (
          <Result setRapidState={setRapidState} />
        )}
      </Game.RapidGame>
    </Game.RapidGameLayout>
  )
}

export default Play
