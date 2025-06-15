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
import { useState, useEffect } from 'react'
import { DateTime } from 'luxon'

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
  const competition = useCompetition()

  useEffect(() => {
    const interval = setInterval(() => {
      const now = DateTime.now()
      const remaining = DateTime.fromMillis(competition.endTime).diff(now).as("milliseconds")
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