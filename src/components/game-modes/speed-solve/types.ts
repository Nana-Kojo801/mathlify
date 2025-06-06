import type { SpeedSolveDifficulty } from '@/types'

export type SpeedSolveGameStore = {
  state:
    | 'idle'
    | 'countdown'
    | 'questions'
    | 'result'
  difficulty: SpeedSolveDifficulty | null
  question: {
    question: string
    correctAnswer: number
    options: number[]
  } | null
  score: number
  wrongs: number
  actions: {
    init: (difficulty: SpeedSolveGameStore['difficulty']) => void
    playAgain: () => void
    generateQuestion: () => void
    reset: () => void
    setState: (state: SpeedSolveGameStore['state']) => void
    setDifficulty: (difficulty: SpeedSolveGameStore['difficulty']) => void
    setQuestion: (questions: SpeedSolveGameStore['question']) => void
    setScore: (score: SpeedSolveGameStore['score']) => void
    setWrongs: (wrongs: SpeedSolveGameStore['wrongs']) => void
  }
}
