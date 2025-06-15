import type { User } from '@/types'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { queryOptions } from '@tanstack/react-query'

export const fetchRapidQueueStatusQueryOptions = (userId: User['_id']) => {
  return queryOptions({
    ...convexQuery(api.queue.getQueueStatus, { userId }),
    gcTime: 1000 * 30,
  })
}

export const fetchActiveRapidMatchQueryOptions = (userId: User['_id']) => {
  return queryOptions({
    ...convexQuery(api.matchmaking.findActiveMatch, { userId }),
    gcTime: 1000 * 30,
  })
}
