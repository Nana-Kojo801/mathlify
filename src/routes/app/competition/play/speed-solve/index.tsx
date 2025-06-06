import Game from '@/components/game-modes/speed-solve'
import {
  useGameState,
  useScore,
} from '@/components/game-modes/speed-solve/speed-solve-game-store'
import { createFileRoute } from '@tanstack/react-router'
import Questions from './-components/questions'
import { calculateSpeedSolveMarathonScore } from '@/lib/helpers'
import { useState } from 'react'
import Result from './-components/result'
import { useCompetitionActions } from '@/stores/competition-store'
import { useUser } from '@/hooks/user'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { useCompetition } from '../../-components/useCompetition'

export const Route = createFileRoute('/app/competition/play/speed-solve/')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = useUser()
  const gameState = useGameState()
  const competition = useCompetition()
  const { getSpeedSolveEntry, addSpeedSolveEntry } = useCompetitionActions()
  const score = useScore()
  const [gameData, setGameData] = useState({
    avgTime: 0,
    questions: 0,
    score: 0,
  })
  const addEntry = useMutation(api.competitions.addSpeedSolveGameEntry)

  const handleResult = (totalTime: number) => {
    const avgTime =
      totalTime === 0 ? 0 : parseFloat((totalTime / score).toFixed(2))
    const newScore = calculateSpeedSolveMarathonScore(totalTime, score)

    const entry = getSpeedSolveEntry(user._id)
    const shouldUpdateEntry = !entry.score || newScore > entry.score

    if (shouldUpdateEntry) {
      const entryData = {
        competitionId: competition._id,
        userId: user._id,
        questions: score,
        avgTime,
        score: newScore,
      }

      addEntry(entryData)
      addSpeedSolveEntry({
        ...entryData,
        username: user.username,
        avatar: user.avatar,
      })

      setGameData((prev) => ({
        ...prev,
        avgTime,
        questions: score,
        score: newScore,
      }))
    }
  }

  return (
    <Game.SpeedSolveGameLayout>
      <div className='className="flex-1 container flex items-center justify-center"'>
        <Game.SpeedSolveGame
          custom={['result', 'questions']}
          quitTo={{ to: '/app/competition' }}
        >
          {gameState === 'questions' && <Questions onResult={handleResult} />}
          {gameState === 'result' && (
            <Result
              avgTime={gameData.avgTime}
              totalQuestions={gameData.questions}
              score={gameData.score}
            />
          )}
        </Game.SpeedSolveGame>
      </div>
    </Game.SpeedSolveGameLayout>
  )
}
