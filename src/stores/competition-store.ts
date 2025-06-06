import type { Competition, User } from '@/types'
import { api } from '@convex/_generated/api'
import type { ConvexReactClient } from 'convex/react'
import { create } from 'zustand'
import { useInitStore } from './init-store'

type CompetitionStore = {
  competition: Competition | null
  actions: {
    setCompetition: (competition: Competition | null) => void
    addCasualEntry: (entry: {
      username: string
      avatar: string
      userId: User['_id']
      round: number
      avgTime: number
      score: number
    }) => void
    addSpeedSolveEntry: (entry: {
      username: string
      avatar: string
      userId: User['_id']
      questions: number
      avgTime: number
      score: number
    }) => void
    getCasualEntry: (userId: User['_id']) => Competition['entries']['casual'][0] & { rank: number }
    getSpeedSolveEntry: (userId: User['_id']) => Competition['entries']['speedSolve'][0] & { rank: number }
  }
}

export const useCompetitionStore = create<CompetitionStore>((set, get) => ({
  competition: null,
  actions: {
    setCompetition: (competition) => set({ competition }),
    getCasualEntry: (userId) => {
      const competition = get().competition!
      const sortedEntries = [...competition.entries.casual].sort((a, b) => b.score - a.score)
      const rank = sortedEntries.findIndex((entry) => entry.userId === userId) + 1
      const entry = sortedEntries.find((entry) => entry.userId === userId)!

      return {
        ...entry,
        rank,
      }
    },
    getSpeedSolveEntry: (userId) => {
      const competition = get().competition!
      const sortedEntries = [...competition.entries.speedSolve].sort((a, b) => b.score - a.score)
      const rank = sortedEntries.findIndex((entry) => entry.userId === userId) + 1
      const entry = sortedEntries.find((entry) => entry.userId === userId)!

      return {
        ...entry,
        rank,
      }
    },
    addCasualEntry: (entry) =>
      set((state) => {
        if (!state.competition) return state
        
        const updatedEntries = state.competition.entries.casual.some(
          (data) => data.userId === entry.userId
        )
          ? state.competition.entries.casual.map((tempEntry) =>
              tempEntry.userId === entry.userId ? entry : tempEntry,
            )
          : [...state.competition.entries.casual, entry]

        return {
          competition: {
            ...state.competition,
            entries: {
              ...state.competition.entries,
              casual: updatedEntries,
            },
          },
        }
      }),
    addSpeedSolveEntry: (entry) =>
      set((state) => {
        if (!state.competition) return state
        
        const updatedEntries = state.competition.entries.speedSolve.some(
          (data) => data.userId === entry.userId
        )
          ? state.competition.entries.speedSolve.map((tempEntry) =>
              tempEntry.userId === entry.userId ? entry : tempEntry,
            )
          : [...state.competition.entries.speedSolve, entry]

        return {
          competition: {
            ...state.competition,
            entries: {
              ...state.competition.entries,
              speedSolve: updatedEntries,
            },
          },
        }
      }),
  },
}))

export const useCompetitionActions = () =>
  useCompetitionStore((state) => state.actions)
export const getCompetition = () =>
  useCompetitionStore((state) => state.competition)

export const registerInitCompetition = (convex: ConvexReactClient) => {
  useInitStore.getState().registerTask(async () => {
    const competition = await convex.query(api.competitions.getCurrent)
    console.log(competition)

    useCompetitionStore.getState().actions.setCompetition(competition)
  })
}
