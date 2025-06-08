import { create } from 'zustand'
import type { FlowGameStore } from './types'
import { generateFlowGameQuestions } from '@/lib/helpers'

// Export the store instance so we can use getState directly
export const flowGameStore = create<FlowGameStore>((set, get) => ({
  state: 'idle',
  difficulty: null,
  questions: [],
  answer: null,
  timeUsed: 0,
  actions: {
    setState: (state) => set({ state }),
    setDifficulty: (difficulty) => set({ difficulty }),
    setQuestions: (questions) => set({ questions }),
    setAnswer: (answer) => set({ answer }),
    setTimeUsed: (timeUsed) => set({ timeUsed }),
    init: (difficulty) => {
      if (difficulty === null) throw Error('Difficulty must not be null')
      console.log('initing', difficulty)
      const questions = generateFlowGameQuestions(difficulty)
      const answer = questions.reduce((prev, curr) => prev + curr, 0)
      set({ difficulty, questions, answer, state: 'idle', timeUsed: 0 })
    },
    playAgain: () => {
      get().actions.init(get().difficulty)
    },
    reset: () => {
      set({
        answer: null,
        difficulty: null,
        state: 'idle',
        questions: [],
        timeUsed: 0,
      })
    },
  },
}))

export const useActions = () => flowGameStore((state) => state.actions)

export const useGameState = () => flowGameStore((state) => state.state)
export const useQuestions = () => flowGameStore((state) => state.questions)
export const useTimeUsed = () => flowGameStore((state) => state.timeUsed)
export const useDifficulty = () =>
  flowGameStore((state) => state.difficulty!)
export const useAnswer = () => flowGameStore((state) => state.answer!)
