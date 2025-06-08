import type { FlowGameDifficulty } from '@/types'

export type FlowGameStore = {
  state:
    | 'idle'
    | 'countdown'
    | 'questions'
    | 'answer'
    | 'correct'
    | 'wrong'
    | 'timeout'
  difficulty: FlowGameDifficulty | null
  questions: number[]
  answer: number | null
  timeUsed: number
  actions: {
    init: (difficulty: FlowGameStore['difficulty']) => void
    playAgain: () => void
    reset: () => void
    setState: (state: FlowGameStore['state']) => void
    setDifficulty: (difficulty: FlowGameStore['difficulty']) => void
    setQuestions: (questions: FlowGameStore['questions']) => void
    setAnswer: (state: FlowGameStore['answer']) => void
    setTimeUsed: (state: FlowGameStore['timeUsed']) => void
  }
}
