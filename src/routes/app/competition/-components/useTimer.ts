import { useState, useEffect } from 'react'
import { useActions } from '@/stores/server-time-store'
import { useCompetition } from './useCompetition'

export const useTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(0)
  const { getServerTime } = useActions()
  const competition = useCompetition()

  useEffect(() => {
    const interval = setInterval(() => {
      const serverTime = getServerTime()
      const remaining = competition.endTime - serverTime
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
