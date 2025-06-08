import Game from '@/components/game-modes/rapid-game'
import {
  useGameState,
  useScore,
} from '@/components/game-modes/rapid-game/rapid-game-store'
import { createFileRoute } from '@tanstack/react-router'
import Questions from './-components/questions'
import { calculateRapidMarathonScore } from '@/lib/helpers'
import { useState } from 'react'
import Result from './-components/result'
import { useUser } from '@/hooks/user'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { useRapidEntry, useCompetition} from '../../-components/hooks'

export const Route = createFileRoute('/app/competition/play/rapid/')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = useUser()
  const gameState = useGameState()
  const competition = useCompetition()
  const score = useScore()
  const [gameData, setGameData] = useState({
    avgTime: 0,
    questions: 0,
    score: 0,
  })
  const entry = useRapidEntry()
  const addEntry = useMutation(api.competitions.addRapidEntry)

  const handleResult = (totalTime: number) => {
    const avgTime =
      totalTime === 0 ? 0 : parseFloat((totalTime / score).toFixed(2))
    const newScore = calculateRapidMarathonScore(totalTime, score)

    const shouldUpdateEntry =
      !entry.score || newScore > entry.score

    if (shouldUpdateEntry) {
      const entryData = {
        competitionId: competition._id,
        userId: user._id,
        questions: score,
        avgTime,
        score: newScore,
      }

      addEntry(entryData)
    }
    setGameData((prev) => ({
      ...prev,
      avgTime,
      questions: score,
      score: newScore,
    }))
  }

  return (
    <Game.RapidGameLayout>
      <div className='className="flex-1 container flex items-center justify-center"'>
        <Game.RapidGame
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
        </Game.RapidGame>
      </div>
    </Game.RapidGameLayout>
  )
}
