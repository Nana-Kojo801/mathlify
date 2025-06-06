import { create } from 'zustand'
import type { SpeedSolveGameStore } from './types'
import { generateSpeedSolveQuestions } from '@/lib/helpers'

const useSpeedSolveGameStore = create<SpeedSolveGameStore>((set, get) => ({
  state: 'idle',
  difficulty: null,
  question: null,
  score: 0,
  wrongs: 0,
  actions: {
    setState: (state) => set({ state }),
    setDifficulty: (difficulty) => set({ difficulty }),
    setQuestion: (question) => set({ question }),
    setScore: (score) => set({ score }),
    setWrongs: (wrongs) => set({ wrongs }),
    init: (difficulty) => {
      if (difficulty === null) throw Error('Difficulty must not be null')
      console.log('initing', difficulty)
      const question = generateSpeedSolveQuestions(difficulty)
      set({ difficulty, question, state: 'idle', wrongs: 0, score: 0 })
    },
    playAgain: () => {
      get().actions.init(get().difficulty)
    },
    generateQuestion: () => {
      set({ question: generateSpeedSolveQuestions(get().difficulty!) })
    },
    reset: () => {
      set({
        difficulty: null,
        state: 'idle',
        question: null,
        score: 0,
        wrongs: 0
      })
    },
  },
}))

export const useActions = () => useSpeedSolveGameStore((state) => state.actions)

export const useGameState = () => useSpeedSolveGameStore((state) => state.state)
export const useQuestion = () => useSpeedSolveGameStore((state) => state.question)
export const useScore = () => useSpeedSolveGameStore((state) => state.score)
export const useWrongs = () => useSpeedSolveGameStore((state) => state.wrongs)
export const useDifficulty = () =>
  useSpeedSolveGameStore((state) => state.difficulty!)
