import type { User } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'
import { isActive } from '@/lib/presence'
import { User as UserIcon } from 'lucide-react'

type UserAvatarProps = {
  username: User['username']
  avatar: User['avatar']
  className?: string
  lastActive?: number
}

const UserAvatar = ({
  avatar,
  className,
  lastActive,
}: UserAvatarProps) => {
  const showStatus = typeof lastActive === 'number'
  const active = showStatus && isActive(lastActive)
  // Thicker, glowy border for online
  const borderClass = showStatus
    ? active
      ? 'ring-4 ring-green-400/70 ring-offset-2 shadow-[0_0_0.5rem_0.1rem_rgba(34,197,94,0.25)]'
      : 'ring-4 ring-gray-400/60 ring-offset-2'
    : ''
  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      <Avatar
        className={cn('w-full h-full aspect-square bg-primary/10', borderClass)}
      >
        <AvatarImage className="object-cover object-center w-full h-full" src={avatar} />
        <AvatarFallback className="flex items-center justify-center w-full h-full">
          <UserIcon className="w-full h-full text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

export default UserAvatar
