import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/user-avatar'
import { useUser } from '@/hooks/user'
import { Edit } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const ProfileHeader = () => {
  const user = useUser()
  return (
    <div className="w-full bg-gradient-to-r from-primary/20 to-secondary/20 pb-6 sm:pb-8 px-4 sm:px-6 border-b border-border/50">
      <div className="flex flex-col sm:flex-row items-start gap-4 pt-6 sm:pt-8">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <UserAvatar
            username={user.username}
            avatar={user.avatar}
            className="size-20 sm:size-32 border-4 border-background shadow-lg"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {user.username}
            </h1>
            <p className="text-muted-foreground">
              Member since{' '}
              {new Date(user._creationTime).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          <Link to="/app/profile/edit">
            <Button
              variant="outline"
              className="gap-2 w-full sm:w-auto hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Edit className="size-4" />
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
