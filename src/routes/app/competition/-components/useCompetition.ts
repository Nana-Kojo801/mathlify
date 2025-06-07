import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchCompetitionQuery } from './queries'

export const useCompetition = () => {
  const { data: competition } = useSuspenseQuery(fetchCompetitionQuery())

  return competition
}
