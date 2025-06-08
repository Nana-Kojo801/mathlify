import { useActions } from '../flow-game-store'
import Review from './review'
import { ActionButton, ActionLayout, ResultLayout } from '../../shared'
import { LogOut, RotateCcw, XCircle } from 'lucide-react'

export const WrongHeader = () => {
  return (
    <div className="flex flex-col items-center">
      <XCircle size={90} className="mb-4 text-red-500 drop-shadow-lg" />
      <h1 className="text-5xl font-extrabold tracking-wide text-red-400">
        Wrong!
      </h1>
      <p className="text-lg mt-2 text-white/80">Oops! Try again next time.</p>
    </div>
  )
}

const Wrong = ({ quit }: { quit: () => void }) => {
  const { playAgain } = useActions()
  return (
    <ResultLayout>
      <WrongHeader />
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

export default Wrong
