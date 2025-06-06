import { useState, useEffect } from 'react'
import { useActions } from '@/stores/server-time-store'
import { useCompetitionStore } from '@/stores/competition-store'

export const useTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(0)
  const { getServerTime } = useActions()

  useEffect(() => {
    const interval = setInterval(() => {
      const serverTime = getServerTime()
      const remaining = useCompetitionStore.getState().competition!.endTime - serverTime
      if (remaining <= 0) {
        clearInterval(interval)
      } else {
        setTimeRemaining(remaining)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return timeRemaining
}
