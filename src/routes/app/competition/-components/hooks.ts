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
  const { data: competition } = useSuspenseQuery(fetchCompetitionQuery())

  return competition!
}

export const useFlowEntry = () => {
  const user = useUser()

  const { data: entry } = useSuspenseQuery(
    fetchFlowEntryQuery(user._id),
  )

  return entry
}

export const useFlowEntries = () => {
  const { data: entries } = useSuspenseQuery(
    fetchFlowEntriesQuery()
  )

  return entries
}

export const useRapidEntries = () => {

  const { data: entries } = useSuspenseQuery(
    fetchRapidEntriesQuery(),
  )

  return entries
}

export const useRapidEntry = () => {
  const user = useUser()

  const { data: entry } = useSuspenseQuery(
    fetchRapidEntryQuery(user._id),
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