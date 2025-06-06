import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/user-avatar'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  convexQuery,
  useConvex,
} from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { useUser } from '@/hooks/user'
import { Skeleton } from '@/components/ui/skeleton'
import type { FriendRequest, User } from '@/types'
import { toast } from 'sonner'
import Spinner from '@/components/spinner'
import { useFriendsStore } from '@/stores/friends-store'

export const Route = createFileRoute('/app/friend-requests/')({
  component: RouteComponent,
})

const FriendRequestsLoading = () => {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between p-3 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50"
        >
          {/* Left side: Avatar and Name */}
          <div className="flex items-center space-x-4">
            <Skeleton className="size-10 rounded-full ring-2 ring-primary ring-offset-2" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          </div>

          {/* Right side: Button / Icon */}
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      ))}
    </div>
  )
}

const Request = ({
  request,
}: {
  request: FriendRequest & { sender: User; receiver: User }
}) => {
  const convex = useConvex()
  const addFriend = useFriendsStore(state => state.addFriend)
  const { mutateAsync: acceptRequest, isPending: isAcceptingRequest } =
    useMutation({
      mutationFn: async () => {
        await Promise.all([
          convex.mutation(api.friendRequests.acceptRequests, {
            requestId: request._id,
          }),
          addFriend(request.sender)
        ])
      },
      onError: () => {
        toast.error('An error occured', { duration: 1000 })
      },
      onSuccess: () => {
        toast.success('Friend request accepted', { duration: 1000 })
      },
    })
  return (
    <div className="flex items-center justify-between p-3 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50">
      {/* Left side: Avatar and Name */}
      <div className="flex items-center space-x-4">
        <UserAvatar
          username={request.sender.username}
          avatar={request.sender.avatar}
          className="size-10 ring-2 ring-primary ring-offset-2"
        />
        <div className="flex flex-col gap-1">
          <span className="font-medium">{request.sender.username}</span>
        </div>
      </div>

      {/* Right side: Button / Icon */}
      <Button
        onClick={async () => {
          await acceptRequest()
        }}
        className="bg-green-400 text-white"
        size="sm"
      >
        {isAcceptingRequest ? <Spinner /> : <Check className="size-6" />}
        Accept
      </Button>
    </div>
  )
}

function RouteComponent() {
  const user = useUser()
  const { data: requests, isPending: loadingRequests } = useQuery({
    ...convexQuery(api.friendRequests.getFullReceivedRequests, {
      userId: user._id,
    }),
    gcTime: 1000 * 60,
    initialData: [],
  })

  return (
    <div className="fixed inset-0 z-20 min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Back Button + Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/app">
              <Button size="icon" variant="ghost" className="size-8 p-0">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <span className="text-xl font-bold text-primary">
              Friend Requests
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col gap-3">
        {/* Friend Requests List (Mock) */}
        {loadingRequests ? (
          <FriendRequestsLoading />
        ) : (
          <div className="flex flex-col gap-2">
            {requests.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No friend requests yet
              </p>
            )}
            {requests.map((request) => (
              <Request key={request._id} request={request} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
