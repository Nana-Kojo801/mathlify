import Game from '@/components/game-modes/casual-game'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import Header from './-components/header'
import {
  useActions,
  useGameState,
  casualGameStore,
} from '@/components/game-modes/casual-game/casual-game-store'
import Result from './-components/result'
import { calculateCasualCompetitionScore } from '@/lib/helpers'
import { useUser } from '@/hooks/user'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { useCompetition } from '../../-components/useCompetition'
import useCasualEntry from '../../-components/useCasualEntry'

export const Route = createFileRoute('/app/competition/play/casual/')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = useUser()
  const competition = useCompetition()
  const gameState = useGameState()
  const { playAgain } = useActions()
  const casualEntry = useCasualEntry()
  const addEntry = useMutation(api.competitions.addCasualGameEntry)

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

      const timeUsed = casualGameStore.getState().timeUsed
      const newTotalTime = gameData.totalTime + timeUsed
      const tempScore = calculateCasualCompetitionScore(timeUsed, gameData.round)
      const newScore = gameData.score + tempScore
      const avgTime = parseFloat((newTotalTime / gameData.round / 100).toFixed(2))

      const shouldUpdateEntry = !casualEntry.score || newScore > casualEntry.score

      if (shouldUpdateEntry) {
        const entryData = {
          competitionId: competition._id,
          userId: user._id,
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
    [gameData, competition, user, addEntry],
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
    <Game.CasualGameLayout>
      <Header score={gameData.score} round={gameData.round} />
      <div className="flex-1 container flex items-center justify-center">
        <Game.CasualGame
          custom={['correct', 'wrong', 'timeout']}
          quitTo={{ to: '/app/competition' }}
          className="w-full max-w-2xl"
          onResult={handleResult}
        >
          {renderResults()}
        </Game.CasualGame>
      </div>
    </Game.CasualGameLayout>
  )
}
