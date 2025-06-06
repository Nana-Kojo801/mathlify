import type { User } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'

type UserAvatarProps = {
  username: User['username']
  avatar: User['avatar']
  className?: string
}

const UserAvatar = ({ username, avatar, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn('w-6 h-6 bg-primary/10 relative', className)}>
      <AvatarImage className="object-cover object-center" src={avatar} />
      <AvatarFallback>{username[0]}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
