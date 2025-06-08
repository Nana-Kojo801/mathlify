import { useActions } from '../flow-game-store'
import Review from './review'
import { ActionButton, ActionLayout, ResultLayout } from '../../shared'
import { Clock, LogOut, RotateCcw } from 'lucide-react'

export const TimeoutHeader = () => {
  return (
    <div className="flex flex-col items-center">
      <Clock size={90} className="mb-4 text-yellow-500 drop-shadow-lg" />
      <h1 className="text-5xl font-extrabold tracking-wide text-yellow-400">
        Time's Up!
      </h1>
      <p className="text-lg mt-2 text-white/80">Don't worry, try again!</p>
    </div>
  )
}

const Timeout = ({ quit }: { quit: () => void }) => {
  const { playAgain } = useActions()
  return (
    <ResultLayout>
      <TimeoutHeader />
      <ActionLayout>
        <ActionButton onClick={playAgain}>
          <RotateCcw className="size-[22]" />
          Play Again
        </ActionButton>
        <ActionButton onClick={quit} variant="destructive">
          <LogOut className="size-[22]" />
          Quit
        </ActionButton>
      </ActionLayout>
      <Review />
    </ResultLayout>
  )
}

export default Timeout
