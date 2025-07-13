import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/user-avatar'
import { useUser } from '@/hooks/user'
import type { FriendRequest, User } from '@/types'
import { Check, Clock3, UserPlus } from 'lucide-react'
import { useAcceptFriendRequestMutation, useSendFriendRequestMutation } from '../-mutations'

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
    useSendFriendRequestMutation()

  const { mutateAsync: acceptRequest, isPending: isAcceptingRequest } = useAcceptFriendRequestMutation()

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
          className="size-10"
        />
        <div className="flex flex-col">
          <span className="font-medium">{friend.username}</span>
        </div>
      </div>

      {user._id === friend._id ? (
        <span className="bg-primary px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          You
        </span>
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
export default Friend
