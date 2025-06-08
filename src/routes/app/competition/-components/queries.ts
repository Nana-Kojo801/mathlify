import type { Competition, User } from "@/types"
import { convexQuery } from "@convex-dev/react-query"
import { api } from "@convex/_generated/api"
import { queryOptions } from "@tanstack/react-query"

export const fetchCompetitionQuery = (competitionId?: Competition["_id"]) => {
    return queryOptions({
        ...convexQuery(api.competitions.get, { competitionId}),
        gcTime: 1000 * 60 * 5
    })
}

export const fetchFlowEntriesQuery = (competitionId?: Competition["_id"]) => {
    return queryOptions({
        ...convexQuery(api.competitions.getFlowEntries, { competitionId }),
        gcTime: 1000 * 60 * 5
    })
}

export const fetchRapidEntriesQuery = (competitionId?: Competition["_id"]) => {
    return queryOptions({
        ...convexQuery(api.competitions.getRapidEntries, { competitionId }),
        gcTime: 1000 * 60 * 5
    })
}

export const fetchFlowEntryQuery = (userId: User["_id"], competitionId?: Competition["_id"]) => {
    return queryOptions({
        ...convexQuery(api.competitions.getFlowEntry, { userId,  competitionId }),
        gcTime: 1000 * 60 * 5
    })
}

export const fetchRapidEntryQuery = (userId: User["_id"], competitionId?: Competition["_id"]) => {
    return queryOptions({
        ...convexQuery(api.competitions.getRapidEntry, { userId,  competitionId }),
        gcTime: 1000 * 60 * 5
    })
}