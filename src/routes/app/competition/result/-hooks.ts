import { useSuspenseQuery } from '@tanstack/react-query'
import { useUser } from '@/hooks/user'
import { useParams } from '@tanstack/react-router'
import type { Competition } from '@/types'
import { fetchCompetitionResultQuery } from './-queries'

export default function useResult() {
  const user = useUser()
  const { id } = useParams({ from: '/app/competition/result/$id' })
  const { data: result } = useSuspenseQuery(
    fetchCompetitionResultQuery(id as Competition['_id'], user._id),
  )
  return result
}
