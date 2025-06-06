import UserAvatar from '@/components/user-avatar'
import { useUser } from '@/hooks/user'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { useQuery } from '@tanstack/react-query'
import { UserPlus, ChevronRight, MessagesSquare, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import type { User } from '@/types'
import { useFriendsStore } from '@/stores/friends-store'

const Friend = ({ friend }: { friend: User }) => {
  const user = useUser()
  const { data: unreadCount } = useQuery({
    ...convexQuery(api.friendMessages.getUnreadMessages, {
      friendId: friend._id,
      userId: user._id,
    }),
    initialData: 0,
  })

  return (
    <div
      key={friend._id}
      className="flex items-center justify-between p-3 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 hover:shadow-md transition"
    >
      <div className="flex items-center space-x-4">
        <UserAvatar
          username={friend.username}
          avatar={friend.avatar}
          className="size-10 ring-2 ring-primary ring-offset-2"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-foreground">
            {friend.username}
          </span>
        </div>
      </div>

      <Link
        to={`/app/chat/$friendId`}
        params={{ friendId: friend._id }}
        className="flex items-center gap-2"
      >
        {unreadCount > 0 && (
          <span className="bg-destructive text-destructive-foreground text-xs rounded-full size-5 flex items-center justify-center font-bold">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
        <Button variant="ghost" className="rounded-full size-5">
          <MessagesSquare className="size-5 text-foreground" />
        </Button>
      </Link>
    </div>
  )
}

export default function FriendsList() {
  const user = useUser()
  const localFriends = useFriendsStore((state) => state.friends)
  const { data: friends } = useQuery({
    ...convexQuery(api.users.getUsers, { users: user.friends }),
    initialData: localFriends,
    enabled: !!localFriends
  })

  const handleViewAllClick = () => {
    console.log('Navigate to all friends page')
    // In a real app: router.push('/friends')
  }

  return (
    <section className="mb-6 w-full">
      {/* Header with notifications */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Friends</h2>
        <div className="flex items-center space-x-3">
          <Link to="/app/friend-requests">
            <Button variant="ghost" className="p-2 rounded-full relative">
              <Bell className="size-5 text-foreground" />
              {/* <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                2
              </span> */}
            </Button>
          </Link>
          <Link to="/app/search-users">
            <Button variant="ghost" className="p-2 rounded-full">
              <UserPlus className="size-5 text-foreground" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Friends List */}
      <div className="space-y-2">
        {friends!.length === 0 && (
          <p className="text-sm text-muted-foreground">No friends yet</p>
        )}

        {friends!.map((friend) => (
          <Friend key={friend._id} friend={friend} />
        ))}
      </div>

      {/* View All Button */}
      {friends!.length > 0 && (
        <Button onClick={handleViewAllClick} className="mt-4 w-full">
          <span className="text-sm font-medium">View All Friends</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </section>
  )
}
