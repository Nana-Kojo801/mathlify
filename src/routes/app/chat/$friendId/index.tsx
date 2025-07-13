import { createFileRoute, useParams } from '@tanstack/react-router'
import {
  useSuspenseQueries,
} from '@tanstack/react-query'
import { api } from '@convex/_generated/api'
import { useUser } from '@/hooks/user'
import type { FriendMessage, User } from '@/types'
import UserAvatar from '@/components/user-avatar'
import { useEffect, useState } from 'react'
import { useMutation } from 'convex/react'
import Chat from '@/components/chat'
import { friendQueryOptions, messagesQueryOptions } from './-queries'
import { PageHeader } from '@/components/page-header'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Message from './-components/message'
import EditMessage from './-components/edit-message'
import { useDeleteMessageMutation, useEditMessageMutation, useSendMessageMutaion } from './-mutations'

export const Route = createFileRoute('/app/chat/$friendId/')({
  component: RouteComponent,
  loader: async ({ context: { app, queryClient }, params }) => {
    const user = app.auth.getState().user!
    const friendId = params.friendId as User['_id']

    await Promise.all([
      queryClient.ensureQueryData(friendQueryOptions(friendId as User['_id'])),
      queryClient.ensureQueryData(
        messagesQueryOptions(user._id, friendId as User['_id']),
      ),
    ])
  },
})

function RouteComponent() {
  const user = useUser()
  const { friendId } = useParams({ from: '/app/chat/$friendId/' })

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState<
    FriendMessage['_id'] | null
  >(null)
  const [editingMessageId, setEditingMessageId] = useState<
    FriendMessage['_id'] | null
  >(null)

  const [{ data: friend }, { data: messages }] = useSuspenseQueries({
    queries: [
      friendQueryOptions(friendId as User['_id']),
      messagesQueryOptions(user._id, friendId as User['_id']),
    ],
  })

  const { mutateAsync: sendMessage, isPending: isSendingMessage } =
    useSendMessageMutaion(friendId as User['_id'])

  const { mutateAsync: deleteMessage, isPending: isDeletingMessage } = useDeleteMessageMutation()

  const { mutateAsync: editMessage, isPending: isEditingMessage } = useEditMessageMutation()

  const markAsRead = useMutation(api.friendMessages.markAsRead)

  useEffect(() => {
    markAsRead({ friendId: friendId as User['_id'] })
  }, [friendId, user._id, markAsRead])

  const handleDeleteMessage = async (messageId: FriendMessage['_id']) => {
    await deleteMessage(messageId)
    setIsDeleteConfirmationOpen(false)
    setSelectedMessageId(null)
  }

  const handleEditMessage = async (
    messageId: FriendMessage['_id'],
    newContent: string,
  ) => {
    await editMessage({ messageId, newMessage: newContent })
    setEditingMessageId(null)
  }

  const handleCancelEdit = () => {
    setEditingMessageId(null)
  }

  return (
    <div className="fixed inset-0 z-30 w-full h-dvh bg-background text-foreground flex flex-col">
      {/* Header */}
      <PageHeader
        className="flex items-center gap-3 px-4 py-1"
        showBackButton
        backLink="/app"
      >
        <UserAvatar
          className="size-10"
          username={friend!.username}
          avatar={friend!.avatar}
          lastActive={friend!.lastActive}
        />
        <div className="flex flex-col justify-center">
          <span className="font-semibold leading-none">{friend!.username}</span>
        </div>
      </PageHeader>

      <Chat
        messages={messages}
        handleSendMessage={async (message) => {
          await sendMessage(message)
        }}
        isSendingMessage={isSendingMessage}
        render={(message) => {
          const isOwn = message.sender._id === user._id
          const isEditing = editingMessageId === message._id

          if (isEditing) {
            return (
              <EditMessage
                key={message._id}
                message={message}
                isOwn={isOwn}
                onSave={handleEditMessage}
                onCancel={handleCancelEdit}
                isSaving={isEditingMessage}
              />
            )
          }

          return (
            <Message
              key={message._id}
              isOwn={isOwn}
              message={message}
              setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen}
              setSelectedMessageId={setSelectedMessageId}
              setEditingMessageId={setEditingMessageId}
            />
          )
        }}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmationOpen && selectedMessageId && (
        <Dialog
          open={isDeleteConfirmationOpen}
          onOpenChange={setIsDeleteConfirmationOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Message</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this message?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDeleteConfirmationOpen(false)}
                disabled={isDeletingMessage}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleDeleteMessage(selectedMessageId)}
                disabled={isDeletingMessage}
                className="flex-1"
              >
                {isDeletingMessage ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
