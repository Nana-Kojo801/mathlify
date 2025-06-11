import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchCompetitionResultQuery } from './queries'
import { useUser } from '@/hooks/user'

export default function useResult() {
  const user = useUser()
  const { data: result } = useSuspenseQuery(
    fetchCompetitionResultQuery(user.lastCompetition!, user._id),
  )
  return result
}
