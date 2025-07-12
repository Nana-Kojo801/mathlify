import type { Competition } from '@/types'
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
      competitionId,
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

export const fetchFlowEntryQuery = (competitionId?: Competition['_id']) => {
  return queryOptions({
    ...convexQuery(api.competitions.getFlowEntry, { competitionId }),
    gcTime: GC_TIME,
  })
}

export const fetchRapidEntryQuery = (competitionId?: Competition['_id']) => {
  return queryOptions({
    ...convexQuery(api.competitions.getRapidEntry, { competitionId }),
    gcTime: GC_TIME,
  })
}

export const fetchShouldShowResultQuery = (
  competitionId?: Competition['_id'],
) => {
  return queryOptions({
    ...convexQuery(api.competitions.shouldShowResult, {
      competitionId,
    }),
    gcTime: GC_TIME,
  })
}
