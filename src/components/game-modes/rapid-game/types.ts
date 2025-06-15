import type { RapidGameDifficulty } from '@/types'

export type RapidGameStore = {
  state:
    | 'idle'
    | 'countdown'
    | 'questions'
    | 'result'
  difficulty: RapidGameDifficulty | null
  question: {
    question: string
    correctAnswer: number
    options: number[]
  } | null
  score: number
  wrongs: number
  actions: {
    init: (difficulty: RapidGameStore['difficulty'], state?: RapidGameStore['state']) => void
    playAgain: () => void
    generateQuestion: () => void
    reset: () => void
    setState: (state: RapidGameStore['state']) => void
    setDifficulty: (difficulty: RapidGameStore['difficulty']) => void
    setQuestion: (questions: RapidGameStore['question']) => void
    setScore: (score: RapidGameStore['score']) => void
    setWrongs: (wrongs: RapidGameStore['wrongs']) => void
  }
}
