import type { Competition, User } from "@/types"
import { convexQuery } from "@convex-dev/react-query"
import { api } from "@convex/_generated/api"
import { queryOptions } from "@tanstack/react-query"

export const fetchCompetitionResultQuery = (competitionId: Competition["_id"], userId: User["_id"]) => {
    return queryOptions({
        ...convexQuery(api.competitions.getResults, { competitionId, userId }),
        gcTime: 1000 * 60
    })
}