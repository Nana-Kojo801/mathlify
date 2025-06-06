import {
  XCircle,
  LogOut,
  RotateCcw,
} from 'lucide-react'
import { useDifficulty, useScore, useWrongs } from './speed-solve-game-store'
import { ActionButton, ActionLayout, ResultLayout, StatItem, StatsGrid } from '../shared'

type ResultsProps = {
  playAgain: () => void
  quit: () => void
}

const Results = ({ playAgain, quit }: ResultsProps) => {
  const score = useScore()
  const wrongs = useWrongs()
  const difficulty = useDifficulty()!
  const totalQuestions = score + wrongs
  const accuracy = Math.round((score / (totalQuestions || 1)) * 100)
  const averageTime =
    totalQuestions === 0
      ? 0
      : parseInt((difficulty.duration / totalQuestions).toFixed(1))

  return (
    <ResultLayout>
      <div className="flex flex-col items-center">
        <XCircle size={90} className="mb-4 text-gray-500 drop-shadow-lg" />
        <h1 className="text-5xl font-extrabold tracking-wide text-gray-400">
          Game Over
        </h1>
      </div>
      <StatsGrid>
        <StatItem label='Correct' value={score} />
        <StatItem label='Wrong' value={wrongs} />
        <StatItem label='Avg Time' value={averageTime} />
        <StatItem label='Accuracy' value={`${accuracy}%`} />

        <ActionLayout className='col-span-2 mt-0 grid grid-cols-2'>
          <ActionButton onClick={playAgain}>
            <RotateCcw className="size-[22]" />
            Play Again
          </ActionButton>
          <ActionButton onClick={quit} variant="destructive">
            <LogOut className="size-[22]" />
            Quit
          </ActionButton>
        </ActionLayout>
      </StatsGrid>
    </ResultLayout>
  )
}

export default Results
