import { convexQuery } from "@convex-dev/react-query"
import { api } from "@convex/_generated/api"
import { queryOptions } from "@tanstack/react-query"

export const fetchCompetitionQuery = () => {
    return queryOptions({
        ...convexQuery(api.competitions.getCurrent, {}),
        gcTime: 1000 * 60 * 5
    })
}