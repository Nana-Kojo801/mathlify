import { convexQuery } from "@convex-dev/react-query";
import { api } from "@convex/_generated/api";
import { queryOptions } from "@tanstack/react-query";

export const getPresetsQueryOptions = () => {
    return queryOptions({
        ...convexQuery(api.presets.get, {}),
        gcTime: 1000 * 10,
        initialData: []
    })
}