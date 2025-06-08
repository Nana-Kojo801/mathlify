import type React from 'react'
import Answer from './answer'
import { useActions, useGameState } from './flow-game-store'
import Countdown from './countdown'
import Idle from './idle'
import Questions from './questions'
import { Correct, Timeout, Wrong } from './result'
import { useNavigate, type NavigateOptions } from '@tanstack/react-router'
import { useCallback } from 'react'
import { cn } from '@/lib/utils'

export const FlowGameLayout = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-20 bg-background overflow-y-auto',
        className,
      )}
    >
      <div className='min-h-screen flex flex-col justify-center items-center'>
        {children}
      </div>
    </div>
  )
}

type FlowGameProps = {
  children?: React.ReactNode
  custom?: string[]
  quitTo: NavigateOptions
  className?: string
  onResult?: (status: "correct" | "wrong" | "timeout") => void
}

const CasualGame = ({
  children,
  custom = [],
  quitTo,
  className,
  onResult = () => {},
}: FlowGameProps) => {
  const gameState = useGameState()
  const { reset } = useActions()
  const navigate = useNavigate()

  const quit = useCallback(() => {
    reset()
    navigate(quitTo)
  }, [navigate])

  const renderState = useCallback(() => {
    switch (gameState) {
      case 'idle':
        if (!custom.includes('idle')) return <Idle />
        break
      case 'countdown':
        if (!custom.includes('countdown')) return <Countdown />
        break
      case 'questions':
        if (!custom.includes('questions')) return <Questions />
        break
      case 'answer':
        if (!custom.includes('answer')) return <Answer onResult={onResult} />
        break
      case 'correct':
        if (!custom.includes('correct')) return <Correct quit={quit} />
        break
      case 'wrong':
        if (!custom.includes('wrong')) return <Wrong quit={quit} />
        break
      case 'timeout':
        if (!custom.includes('timeout')) return <Timeout quit={quit} />
        break
    }
  }, [custom, gameState])

  return (
    <div
      className={cn(
        'w-full h-full flex justify-center items-center',
        className,
      )}
    >
      {renderState()}
      {children && children}
    </div>
  )
}

export default CasualGame
