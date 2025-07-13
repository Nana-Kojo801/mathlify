import { useFriendsStore } from '@/stores/friends-store'
import type { FriendRequest, User } from '@/types'
import { api } from '@convex/_generated/api'
import { useMutation } from '@tanstack/react-query'
import { useConvex } from 'convex/react'
import { toast } from 'sonner'

export const useAcceptFriendRequestMutation = (
  request: FriendRequest & { sender: User; receiver: User },
) => {
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
    onError: () => {
      toast.error('An error occured', { duration: 1000 })
    },
    onSuccess: () => {
      toast.success('Friend request accepted', { duration: 1000 })
    },
  })
}
