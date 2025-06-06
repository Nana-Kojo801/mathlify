import { createFileRoute, Link } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserPlus, ArrowLeft, Clock3, Check } from 'lucide-react'
import UserAvatar from '@/components/user-avatar'
import { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '@convex/_generated/api'
import type { FriendRequest, User } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useConvexMutation } from '@convex-dev/react-query'
import { toast } from 'sonner'
import { useUser } from '@/hooks/user'
import Spinner from '@/components/spinner'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/app/search-users/')({
  component: SearchUsersPage,
})

const Friend = ({
  friend,
  sentRequests,
  receivedRequests,
}: {
  friend: User
  sentRequests: FriendRequest[]
  receivedRequests: FriendRequest[]
}) => {
  const user = useUser()

  const { mutateAsync: sendFriendRequest, isPending: isSendingFriendRequest } =
    useMutation({
      mutationFn: useConvexMutation(api.friendRequests.insert),
      onError: () => {
        toast.error('An error occured', { duration: 1000 })
      },
    })

  const { mutateAsync: acceptRequest, isPending: isAcceptingRequest } =
    useMutation({
      mutationFn: useConvexMutation(api.friendRequests.acceptRequests),
      onError: () => {
        toast.error('An error occured', { duration: 1000 })
      },
      onSuccess: () => {
        toast.success('Friend request accepted', { duration: 1000 })
      },
    })

  const alreadySent = sentRequests.some(
    (request) => request.receiverId === friend._id,
  )
  const alreadyReceived = receivedRequests.some(
    (request) => request.receiverId === user._id,
  )
  const alreadyFriend = user.friends.some((friendId) => friendId === friend._id)

  return (
    <div
      key={friend._id}
      className="flex items-center justify-between p-3 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 hover:shadow-sm transition"
    >
      <div className="flex items-center space-x-4">
        <UserAvatar
          username={friend.username}
          avatar={friend.avatar!}
          className="size-10 ring-2 ring-primary ring-offset-2"
        />
        <div className="flex flex-col">
          <span className="font-medium">{friend.username}</span>
        </div>
      </div>

      {user._id === friend._id ? (
        <Badge>You</Badge>
      ) : alreadyFriend ? (
        <Check className="size-6 text-green-400" />
      ) : alreadySent ? (
        <Clock3 className="size-6 text-yellow-400" />
      ) : alreadyReceived ? (
        <Button
          onClick={async () => {
            const request = receivedRequests.find(
              (request) => request.senderId === friend._id,
            )!
            await acceptRequest({ requestId: request._id })
          }}
          className="bg-green-400 text-white"
          size="sm"
        >
          {isAcceptingRequest ? <Spinner /> : <Check className="size-6" />}
          Accept
        </Button>
      ) : (
        <Button
          onClick={async () => {
            await sendFriendRequest({
              senderId: user._id,
              receiverId: friend._id,
            })
          }}
          size="sm"
          className="gap-1"
          disabled={isSendingFriendRequest}
        >
          {isSendingFriendRequest ? (
            <Spinner />
          ) : (
            <UserPlus className="size-4" />
          )}
          Send request
        </Button>
      )}
    </div>
  )
}

function SearchUsersPage() {
  const [query, setQuery] = useState('')
  const user = useUser()
  const users = useQuery(api.users.searchUsers, { query }) || []
  const sentRequests =
    useQuery(api.friendRequests.getSentRequests, { userId: user._id }) || []
  const receivedRequest =
    useQuery(api.friendRequests.getReceivedRequests, {
      userId: user._id,
    }) || []

  return (
    <div className="flex flex-col fixed inset-0 w-full h-full z-20 bg-background text-foreground">
      {/* Top Bar */}
      <div className="border-b border-border p-4 pb-3 mb-3">
        <div className="relative flex items-center justify-center mb-4">
          {/* Back Button */}
          <Link
            to="/app"
            className="absolute left-0 text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="size-5" />
          </Link>

          {/* Title */}
          <h2 className="text-lg font-semibold">Search for Friends</h2>
        </div>

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search users..."
          className="w-full py-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* User List */}
      <div className="flex-1 px-4 pb-4 space-y-3 overflow-y-auto">
        {users.map((user) => (
          <Friend
            key={user._id}
            friend={user}
            sentRequests={sentRequests}
            receivedRequests={receivedRequest}
          />
        ))}
      </div>
    </div>
  )
}
