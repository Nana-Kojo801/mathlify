import {
  ActionButton,
  ActionLayout,
  ResultLayout,
  StatItem,
  StatsGrid,
} from '@/components/game-modes/shared'
import { useActions } from '@/components/game-modes/speed-solve/speed-solve-game-store'
import { useNavigate } from '@tanstack/react-router'
import { LogOut, RotateCcw, XCircle } from 'lucide-react'

const ResultHeader = () => {
  return (
    <div className="flex flex-col items-center">
      <XCircle size={90} className="mb-4 text-red-500 drop-shadow-lg" />
      <h1 className="text-5xl font-extrabold tracking-wide text-red-400">
        Game Over!
      </h1>
      <p className="text-lg mt-2 text-white/80">Oops! Try again next time.</p>
    </div>
  )
}

const Result = ({
  avgTime,
  totalQuestions,
  score,
}: {
  avgTime: number
  totalQuestions: number
  score: number
}) => {
  const { playAgain, reset } = useActions()
  const navigate = useNavigate()

  const quit = () => {
    reset()
    navigate({ to: '/app/competition' })
  }

  return (
    <ResultLayout>
      <ResultHeader />
      <StatsGrid>
        <StatItem label="Questions" value={totalQuestions} />
        <StatItem label="Avg Time" value={`${avgTime}s`} />
        <StatItem label="Score" value={score} className="col-span-2" />

        <ActionLayout className="col-span-2 mt-0 grid grid-cols-2">
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

export default Result
