import { useFriendsStore } from '@/stores/friends-store'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { useQuery } from '@tanstack/react-query'
import { useUser } from './user'

export default function useFriends() {
  const user = useUser()
  const localFriends = useFriendsStore((state) => state.friends)
  const { data: friends } = useQuery({
    ...convexQuery(api.users.getUsers, { users: user.friends }),
    initialData: localFriends,
  })

  return friends
}
