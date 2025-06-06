import type { User } from "@/types";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@convex/_generated/api";
import { queryOptions } from "@tanstack/react-query";

export const getPresetsQueryOptions = (userId: User["_id"]) => {
    return queryOptions({
        ...convexQuery(api.presets.get, { userId }),
        gcTime: 1000 * 10,
        initialData: []
    })
}