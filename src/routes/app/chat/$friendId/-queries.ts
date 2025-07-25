import type { User } from '@/types'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { queryOptions } from '@tanstack/react-query'
import { useFriendMessagesStore } from '@/stores/friend-messages-store'
import { useFriendsStore } from '@/stores/friends-store'

export const friendQueryOptions = (friendId: User['_id']) => {
  const getFriend = useFriendsStore.getState().getFriend
  return queryOptions({
    ...convexQuery(api.users.get, { id: friendId }),
    initialData: getFriend(friendId)
  })
}

export const messagesQueryOptions = (
  userId: User['_id'],
  friendId: User['_id'],
) => {
  const messages = useFriendMessagesStore
    .getState()
    .getFriendMessages(userId, friendId)
  return queryOptions({
    ...convexQuery(api.friendMessages.getMessages, {
      friendId,
    }),
    initialData: messages
  })
}
