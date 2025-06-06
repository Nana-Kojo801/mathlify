import { create } from 'zustand'

export type InitializationTask = () => Promise<void>

type InitState = {
  tasks: InitializationTask[]
  isInitializing: boolean
  registerTask: (task: InitializationTask) => void
  setIsInitializing: (isInitializing: boolean) => void
}

export const useInitStore = create<InitState>((set) => ({
  tasks: [],
  isInitializing: true,
  registerTask: (task) => 
    set((state) => ({ 
      tasks: [...state.tasks, task] 
    })),
  setIsInitializing: (isInitializing) => 
    set({ isInitializing })
}))