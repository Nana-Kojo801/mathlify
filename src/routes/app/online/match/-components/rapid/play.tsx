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

const Countdown = () => {
  const match = useActiveRapidMatch()
  const [timer, setTimer] = useState(3)

  useEffect(() => {
    if (!match || match.status !== 'countdown') return
    const interval = setInterval(() => {
      const now = DateTime.now()
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
      const now = DateTime.now()
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
    <div className="text-center space-y-8">
      <h2 className="text-3xl font-bold mb-8">
        {isDraw ? (
          "It's a Draw!"
        ) : (
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            {winner.username} Wins!
          </span>
        )}
      </h2>
      <div className="flex items-center justify-center gap-16">
        <div className="flex flex-col items-center space-y-4">
          <UserAvatar
            avatar={tempMatch.current.player1.avatar}
            username={tempMatch.current.player1.username}
            className="w-24 h-24"
          />
          <span className="text-xl font-bold">
            {tempMatch.current.player1.username}
          </span>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">
              {tempMatch.current.gameResult.player1}
            </div>
            <div className="text-sm text-muted-foreground">questions</div>
          </div>
          <div className="text-sm text-muted-foreground">
            Elo: {tempMatch.current.player1.elo}
          </div>
        </div>

        <div className="text-2xl font-black text-primary">VS</div>

        <div className="flex flex-col items-center space-y-4">
          <UserAvatar
            avatar={tempMatch.current.player2.avatar}
            username={tempMatch.current.player2.username}
            className="w-24 h-24"
          />
          <span className="text-xl font-bold">
            {tempMatch.current.player2.username}
          </span>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">
              {tempMatch.current.gameResult.player2}
            </div>
            <div className="text-sm text-muted-foreground">questions</div>
          </div>
          <div className="text-sm text-muted-foreground">
            Elo: {tempMatch.current.player2.elo}
          </div>
        </div>
      </div>{' '}
      <div className="mt-12 space-x-4">
        <Button size="lg" className="px-8" onClick={handleFindNext}>
          Find Next Opponent
        </Button>
        <Button
          size="lg"
          className="px-8"
          variant="outline"
          onClick={handleQuit}
        >
          Quit
        </Button>
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
