import type { User } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'
import { isActive } from '@/lib/presence'

type UserAvatarProps = {
  username: User['username']
  avatar: User['avatar']
  className?: string
  lastActive?: number
}

const UserAvatar = ({
  username,
  avatar,
  className,
  lastActive,
}: UserAvatarProps) => {
  return (
    <Avatar
      className={cn(
        'w-6 h-6 bg-primary/10 relative',
        className,
        lastActive
          ? isActive(lastActive)
            ? 'ring-2 ring-green-600'
            : 'ring-2 ring-red-600'
          : '',
      )}
    >
      <AvatarImage className="object-cover object-center" src={avatar} />
      <AvatarFallback>{username[0]}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
