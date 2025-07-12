import Game from '@/components/game-modes/flow-game'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import Header from './-components/header'
import {
  useActions,
  useGameState,
  flowGameStore,
} from '@/components/game-modes/flow-game/flow-game-store'
import Result from './-components/result'
import { calculateFlowCompetitionScore } from '@/lib/helpers'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import {useFlowEntry, useCompetition} from '../../-hooks'
import { useAuth } from '@/components/app-wrapper'

export const Route = createFileRoute('/app/competition/play/flow/')({
  component: RouteComponent,
})

function RouteComponent() {
  const updateAuthUser = useAuth((state) => state.updateAuthUser)
  const competition = useCompetition()
  const gameState = useGameState()
  const { playAgain } = useActions()
  const entry = useFlowEntry()
  const addEntry = useMutation(api.competitions.addFlowEntry)

  const [gameData, setGameData] = useState({
    round: 1,
    score: 0,
    totalTime: 0,
  })

  const resetGame = useCallback(() => {
    setGameData({ round: 1, score: 0, totalTime: 0 })
    playAgain()
  }, [])

  const handleResult = useCallback(
    (status: 'correct' | 'wrong' | 'timeout') => {
      if (status !== 'correct') return
      updateAuthUser({ lastCompetition: competition._id })
      const timeUsed = flowGameStore.getState().timeUsed
      const newTotalTime = gameData.totalTime + timeUsed
      const tempScore = calculateFlowCompetitionScore(timeUsed, gameData.round)
      const newScore = gameData.score + tempScore
      const avgTime = parseFloat((newTotalTime / gameData.round / 100).toFixed(2))

      const shouldUpdateEntry = !entry.score || newScore > entry.score

      if (shouldUpdateEntry) {
        const entryData = {
          competitionId: competition._id,
          round: gameData.round,
          avgTime,
          score: newScore,
        }
        addEntry(entryData)
      }

      setGameData(prev => ({
        ...prev,
        totalTime: newTotalTime,
        score: newScore,
      }))
    },
    [gameData, competition, addEntry],
  )

  const renderResults = useCallback(() => {
    if (!['correct', 'wrong', 'timeout'].includes(gameState)) return null

    const commonProps = {
      round: gameData.round,
      score: gameData.score,
    }

    return gameState === 'correct' ? (
      <Result
        {...commonProps}
        nextRound={() => {
          setGameData(prev => ({ ...prev, round: prev.round + 1 }))
          playAgain()
        }}
        type="correct"
      />
    ) : (
      <Result
        {...commonProps}
        retry={resetGame}
        type={gameState as 'wrong' | 'timeout'}
        totalTime={gameData.totalTime}
      />
    )
  }, [gameState, gameData, resetGame])

  return (
    <Game.FlowGameLayout>
      <Header score={gameData.score} round={gameData.round} />
      <div className="flex-1 container flex items-center justify-center">
        <Game.FlowGame
          custom={['correct', 'wrong', 'timeout']}
          quitTo={{ to: '/app/competition' }}
          className="w-full max-w-2xl"
          onResult={handleResult}
        >
          {renderResults()}
        </Game.FlowGame>
      </div>
    </Game.FlowGameLayout>
  )
}
