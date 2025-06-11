import { useSuspenseQuery } from '@tanstack/react-query'
import {
  fetchCompetitionQuery,
  fetchFlowEntriesQuery,
  fetchFlowEntryQuery,
  fetchRapidEntriesQuery,
  fetchRapidEntryQuery,
  fetchShouldShowResultQuery,
} from './queries'
import { useUser } from '@/hooks/user'
import { useActions } from '@/stores/server-time-store'
import { useState, useEffect } from 'react'

export const useCompetition = () => {
    const user = useUser()
  const { data: competition } = useSuspenseQuery(fetchCompetitionQuery(user.lastCompetition))

  return competition!
}

export const useFlowEntry = () => {
  const user = useUser()
  const competition = useCompetition()

  const { data: entry } = useSuspenseQuery(
    fetchFlowEntryQuery(user._id, competition._id),
  )

  return entry
}

export const useFlowEntries = () => {
  const competition = useCompetition()

  const { data: entries } = useSuspenseQuery(
    fetchFlowEntriesQuery(competition._id),
  )

  return entries
}

export const useRapidEntries = () => {
  const user = useUser()

  const { data: entries } = useSuspenseQuery(
    fetchRapidEntriesQuery(user.lastCompetition),
  )

  return entries
}

export const useRapidEntry = () => {
  const user = useUser()

  const { data: entry } = useSuspenseQuery(
    fetchRapidEntryQuery(user._id, user.lastCompetition),
  )

  return entry
}

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

export const useShouldShowResult = () => {
  const user = useUser()

  const { data: shouldShow } = useSuspenseQuery(
    fetchShouldShowResultQuery(user._id, user.lastCompetition)
  )

  return shouldShow
}