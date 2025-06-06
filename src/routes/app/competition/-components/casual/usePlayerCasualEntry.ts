import { useUser } from '@/hooks/user'
import { useCompetition } from '../useCompetition'

const usePlayerCasualEntry = () => {
  const user = useUser()
  const competition = useCompetition()

  const playerEntry = competition.entries.casual.find(
    (entry) => entry.userId === user._id,
  )

  const rank = competition
    .entries.casual.sort((a, b) => b.score - a.score)
    .findIndex((entry) => entry.userId === user._id) + 1

  if (!playerEntry) {
    return {
      userId: user._id,
      username: user.username,
      avatar: user.avatar,
      score: 0,
      round: 0,
      avgTime: 0,
      rank: 0
    }
  }

  return { ...playerEntry, rank }
}

export default usePlayerCasualEntry