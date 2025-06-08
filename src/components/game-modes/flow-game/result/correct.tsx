import { useActions } from '../flow-game-store'
import Review from './review'
import { ActionButton, ActionLayout, ResultLayout } from '../../shared'
import {
  CheckCircle,
  LogOut,
  RotateCcw,
} from 'lucide-react'

export const CorrectHeader = () => {
  return (
    <div className="flex flex-col items-center">
      <CheckCircle size={90} className="mb-4 text-green-500 drop-shadow-lg" />
      <h1 className="text-5xl font-extrabold tracking-wide text-green-400">
        Correct!
      </h1>
      <p className="text-lg mt-2 text-white/80">Nice work! You nailed it.</p>
    </div>
  )
}

const Correct = ({ quit }: { quit: () => void }) => {
  const { playAgain } = useActions()
  return (
    <ResultLayout>
      <CorrectHeader />
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

export default Correct
