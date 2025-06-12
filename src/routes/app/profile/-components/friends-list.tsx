import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/user-avatar'
import useFriends from '@/hooks/friends'
import type { User } from '@/types'
import { User as UserIcon } from 'lucide-react'

const Friend = ({ friend }: { friend: User }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/30 hover:bg-muted/40 transition-colors">
    <div className="relative">
      <UserAvatar
        username={friend.username}
        avatar={friend.avatar}
        className="size-10"
      />
    </div>
    <div className="flex-1">
      <span className="font-medium text-sm">{friend.username}</span>
    </div>
  </div>
)

const FriendsList = ({ all = false }: { all: boolean }) => {
  const friends = useFriends()
  return (
    <div className='flex flex-col gap-2'>
      <h3 className="text-lg font-bold flex items-center gap-2">
        <UserIcon className="size-5" />
        Friends ({friends.length})
      </h3>
      <div className="space-y-3">
        {all
          ? friends.map((friend) => <Friend key={friend._id} friend={friend} />)
          : friends
              .slice(0, 5)
              .map((friend) => <Friend key={friend._id} friend={friend} />)}
      </div>
      {!all && friends.length > 5 && (
        <Button variant="outline" className="w-full mt-3">
          View More
        </Button>
      )}
    </div>
  )
}

export default FriendsList
