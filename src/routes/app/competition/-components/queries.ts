import type { Competition, User } from '@/types'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { queryOptions } from '@tanstack/react-query'

const GC_TIME = 1000 * 60 * 5

export const fetchCompetitionQuery = (competitionId?: Competition['_id']) => {
  return queryOptions({
    ...convexQuery(api.competitions.get, { competitionId }),
    gcTime: GC_TIME,
  })
}

export const fetchFlowEntriesQuery = (competitionId?: Competition['_id']) => {
  return queryOptions({
    ...convexQuery(api.competitions.getFlowEntries, {
      competitionId
    }),
    gcTime: GC_TIME,
  })
}

export const fetchWeek = () => {
  return queryOptions({
    ...convexQuery(api.competitions.getWeek, {}),
    gcTime: GC_TIME,
  })
}

export const fetchRapidEntriesQuery = (competitionId?: Competition['_id']) => {
  return queryOptions({
    ...convexQuery(api.competitions.getRapidEntries, {
      competitionId,
    }),
    gcTime: GC_TIME,
  })
}

export const fetchFlowEntryQuery = (
  userId: User['_id'],
  competitionId?: Competition['_id'],
) => {
  return queryOptions({
    ...convexQuery(api.competitions.getFlowEntry, { userId, competitionId }),
    gcTime: GC_TIME,
  })
}

export const fetchRapidEntryQuery = (
  userId: User['_id'],
  competitionId?: Competition['_id'],
) => {
  return queryOptions({
    ...convexQuery(api.competitions.getRapidEntry, { userId, competitionId }),
    gcTime: GC_TIME,
  })
}

export const fetchShouldShowResultQuery = (
  userId: User['_id'],
  competitionId?: Competition['_id'],
) => {
  return queryOptions({
    ...convexQuery(api.competitions.shouldShowResult, {
      competitionId,
      userId,
    }),
    gcTime: GC_TIME,
  })
}
