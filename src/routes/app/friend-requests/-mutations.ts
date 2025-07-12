import { useFriendsStore } from '@/stores/friends-store'
import type { FriendRequest, User } from '@/types'
import { api } from '@convex/_generated/api'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { useConvex } from 'convex/react'

export const useAcceptFriendRequestMutation = ({
  request,
  ...options
}: UseMutationOptions & {
  request: FriendRequest & { sender: User; receiver: User }
}) => {
  const convex = useConvex()
  const addFriend = useFriendsStore((state) => state.addFriend)
  return useMutation({
    mutationFn: async () => {
      await Promise.all([
        convex.mutation(api.friendRequests.acceptRequests, {
          requestId: request._id,
        }),
        addFriend(request.sender),
      ])
    },
    ...options,
  })
}
