import { useConvexMutation } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useSendFriendRequestMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.friendRequests.insert),
    onError: () => {
      toast.error('An error occured', { duration: 1000 })
    },
  })
}

export const useAcceptFriendRequestMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.friendRequests.acceptRequests),
    onError: () => {
      toast.error('An error occured', { duration: 1000 })
    },
    onSuccess: () => {
      toast.success('Friend request accepted', { duration: 1000 })
    },
  })
}
