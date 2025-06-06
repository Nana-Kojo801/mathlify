import { type PropsWithChildren, useEffect } from 'react'
import { useInitStore } from '@/stores/init-store'

export default function InitializationProvider({ children }: PropsWithChildren) {
  const { tasks, setIsInitializing } = useInitStore()

  useEffect(() => {
    const runTasks = async () => {
      for (const task of tasks) {
        try {
          await task()
        } catch (error) {
          console.error('Initialization task failed:', error)
        }
      }
      setIsInitializing(false)
    }

    runTasks()
  }, [tasks, setIsInitializing])

  return children
}