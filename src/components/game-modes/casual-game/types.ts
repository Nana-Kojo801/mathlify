import type { CasualGameDifficulty } from '@/types'

export type CasualGameStore = {
  state:
    | 'idle'
    | 'countdown'
    | 'questions'
    | 'answer'
    | 'correct'
    | 'wrong'
    | 'timeout'
  difficulty: CasualGameDifficulty | null
  questions: number[]
  answer: number | null
  timeUsed: number
  actions: {
    init: (difficulty: CasualGameStore['difficulty']) => void
    playAgain: () => void
    reset: () => void
    setState: (state: CasualGameStore['state']) => void
    setDifficulty: (difficulty: CasualGameStore['difficulty']) => void
    setQuestions: (questions: CasualGameStore['questions']) => void
    setAnswer: (state: CasualGameStore['answer']) => void
    setTimeUsed: (state: CasualGameStore['timeUsed']) => void
  }
}
