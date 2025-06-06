import { useCompetitionStore } from '@/stores/competition-store'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { useQuery } from '@tanstack/react-query'

export const useCompetition = () => {
  const { data: competition } = useQuery({
    ...convexQuery(api.competitions.getCurrent, {}),
    initialData: useCompetitionStore.getState().competition!,
  })

  return competition
}
