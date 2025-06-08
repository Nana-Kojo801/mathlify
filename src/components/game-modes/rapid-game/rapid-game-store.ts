import { create } from 'zustand'
import type { RapidGameStore } from './types'
import { generateRapidGameQuestions } from '@/lib/helpers'

const useRapidGameStore = create<RapidGameStore>((set, get) => ({
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
      const question = generateRapidGameQuestions(difficulty)
      set({ difficulty, question, state: 'idle', wrongs: 0, score: 0 })
    },
    playAgain: () => {
      get().actions.init(get().difficulty)
    },
    generateQuestion: () => {
      set({ question: generateRapidGameQuestions(get().difficulty!) })
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

export const useActions = () => useRapidGameStore((state) => state.actions)

export const useGameState = () => useRapidGameStore((state) => state.state)
export const useQuestion = () => useRapidGameStore((state) => state.question)
export const useScore = () => useRapidGameStore((state) => state.score)
export const useWrongs = () => useRapidGameStore((state) => state.wrongs)
export const useDifficulty = () =>
  useRapidGameStore((state) => state.difficulty!)
