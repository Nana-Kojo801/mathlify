import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import {
  useMutation as useTanstackMutation,
  useQueries,
} from '@tanstack/react-query'
import { api } from '@convex/_generated/api'
import { useUser } from '@/hooks/user'
import type { User } from '@/types'
import UserAvatar from '@/components/user-avatar'
import { useEffect } from 'react'
import { useMutation } from 'convex/react'
import { Skeleton } from '@/components/ui/skeleton'
import Chat from '@/components/chat'
import { friendQueryOptions, messagesQueryOptions } from './-queries'
import { useConvex } from 'convex/react'
import { useFriendMessagesStore } from '@/stores/friend-messages-store'

export const Route = createFileRoute('/app/chat/$friendId/')({
  component: RouteComponent,
})

const ChatHeaderSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-9 w-9 rounded-full" />
      <div className="flex flex-col space-y-1">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-3 w-16 rounded" />
      </div>
    </div>
  )
}

function RouteComponent() {
  const user = useUser()
  const { friendId } = useParams({ from: '/app/chat/$friendId/' })
  const convex = useConvex()
  const addMessage = useFriendMessagesStore(state => state.addMessage)

  const [{ data: friend, isLoading: loadingFriend }, { data: messages }] =
    useQueries({
      queries: [
        friendQueryOptions(friendId as User['_id']),
        messagesQueryOptions(user._id, friendId as User['_id']),
      ]
    })

  const { mutateAsync: sendMessage, isPending: isSendingMessage } =
    useTanstackMutation({
      mutationFn: async (message: string) => {
        const newMessage = await convex.mutation(api.friendMessages.sendMessage, {
          senderId: user._id,
          receiverId: friendId as User['_id'],
          message,
        })
        addMessage(newMessage)
      },
    })
  const markAsRead = useMutation(api.friendMessages.markAsRead)

  useEffect(() => {
    markAsRead({ userId: user._id, friendId: friendId as User['_id'] })
  }, [friendId, user._id, markAsRead])

  return (
    <div className="fixed inset-0 z-30 w-full h-dvh bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4">
        <div className="flex items-center gap-3 h-16">
          <Link to="/app">
            <Button size="icon" variant="ghost" className="rounded-full">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          {loadingFriend ? (
            <ChatHeaderSkeleton />
          ) : (
            <>
              <UserAvatar
                className="size-10"
                username={friend!.username}
                avatar={friend!.avatar}
              />
              <div className="flex flex-col justify-center">
                <span className="font-semibold leading-none">
                  {friend!.username}
                </span>
                {/* <span className="text-xs text-muted-foreground">Online</span> */}
              </div>
            </>
          )}
        </div>
      </header>

      <Chat
        messages={messages}
        handleSendMessage={async (message) => {
          await sendMessage(message)
        }}
        isSendingMessage={isSendingMessage}
        render={(message) => (
          <div
            key={message._id}
            className="group/message hover:bg-accent/5 rounded-md p-2"
          >
            <div className="flex gap-2">
              <UserAvatar
                username={message.sender.username}
                avatar={message.sender.avatar}
                className="size-10"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-1">
                  <span className={`font-medium`}>
                    {message.sender.username}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {new Date(message._creationTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <div className="space-y-1">
                  <div key={message._id} className="text-sm min-w-0">
                    <p className="break-words">{message.message}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  )
}
