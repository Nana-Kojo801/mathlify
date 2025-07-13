import { useFriendMessagesStore } from '@/stores/friend-messages-store'
import type { FriendMessage, User } from '@/types'
import { api } from '@convex/_generated/api'
import { useMutation } from '@tanstack/react-query'
import { useConvex } from 'convex/react'
import { toast } from 'sonner'

export const useSendMessageMutaion = (friendId: User['_id']) => {
  const convex = useConvex()
  const addMessage = useFriendMessagesStore((state) => state.addMessage)
  return useMutation({
    mutationFn: async (message: string) => {
      const newMessage = await convex.mutation(api.friendMessages.sendMessage, {
        receiverId: friendId,
        message,
      })
      addMessage(newMessage)
    },
    onError: () => {
      toast.error('Error sending message. Please try again later')
    },
  })
}

export const useDeleteMessageMutation = () => {
  const convex = useConvex()
  const deleteLocalMessage = useFriendMessagesStore(
    (state) => state.deleteMessage,
  )
  return useMutation({
    mutationFn: async (id: FriendMessage['_id']) => {
      await convex.mutation(api.friendMessages.deleteMessage, { id })
      return id
    },
    onSuccess: (messageId) => {
      deleteLocalMessage(messageId)
      toast.success('Message deleted successfully')
    },
    onError: () => {
      toast.error('Error deleting message. Please try again later')
    },
  })
}

export const useEditMessageMutation = () => {
  const convex = useConvex()
  const editLocalMessage = useFriendMessagesStore((state) => state.editMessage)
  return useMutation({
    mutationFn: async (data: {
      messageId: FriendMessage['_id']
      newMessage: string
    }) => {
      await convex.mutation(api.friendMessages.editMessage, data)
      return data
    },
    onSuccess: ({ messageId, newMessage }) => {
      editLocalMessage(messageId, newMessage)
      toast.success('Message edited successfully')
    },
    onError: () => {
      toast.error('Error editing message. Please try again later')
    },
  })
}
