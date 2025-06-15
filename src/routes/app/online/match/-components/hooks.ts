import { useUser } from '@/hooks/user'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  fetchActiveRapidMatchQueryOptions,
  fetchRapidQueueStatusQueryOptions,
} from './queries'

export const useRapidQueueStatus = () => {
  const user = useUser()

  const { data: status } = useSuspenseQuery(
    fetchRapidQueueStatusQueryOptions(user._id),
  )

  return status
}

export const useActiveRapidMatch = () => {
  const user = useUser()

  const { data: match } = useSuspenseQuery(
    fetchActiveRapidMatchQueryOptions(user._id),
  )

  return match
}
