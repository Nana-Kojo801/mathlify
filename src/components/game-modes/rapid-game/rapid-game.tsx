import Idle from './idle'
import CountDown from './countdown'
import Questions from './questions'
import { useCallback, useEffect, useRef, type PropsWithChildren } from 'react'
import Result from './result'
import {
  useDifficulty,
  useGameState,
  useActions,
} from './rapid-game-store'
import { useNavigate, type NavigateOptions } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

type RapidGameProps = {
  custom?: string[]
  quitTo: NavigateOptions
}

const RapidGame = ({
  custom = [],
  quitTo,
  children,
}: PropsWithChildren & RapidGameProps) => {
  const state = useGameState()
  const difficulty = useDifficulty()
  const { init, reset } = useActions()
  const navigate = useNavigate()
  const isMounted = useRef(false)

  const playAgain = () => {
    init(difficulty)
  }

  const quit = useCallback(() => {
    reset()
    navigate(quitTo)
  }, [navigate, reset])

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    return () => {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full h-full flex justify-center items-center'>
      {state === 'idle' && <Idle />}
      {state === 'countdown' && !custom.includes('countdown') && <CountDown />}
      {state === 'questions' && !custom.includes('questions') && <Questions />}
      {state === 'result' && !custom.includes('result') && (
        <Result playAgain={playAgain} quit={quit} />
      )}
      {children && children}
    </div>
  )
}

export const RapidGameLayout = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-20 bg-background flex justify-center items-center',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default RapidGame
