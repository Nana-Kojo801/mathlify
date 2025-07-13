import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/user-avatar'
import { useUser } from '@/hooks/user'
import { Edit, Calendar, Brain, Zap } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const ProfileHeader = () => {
  const user = useUser()
  return (
    <div className="w-full bg-gradient-to-br from-background via-background to-primary/5 pb-8 px-6 border-b border-border/30">
      <div className="flex flex-col sm:flex-row items-start gap-6 pt-8">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <UserAvatar
            username={user.username}
            avatar={user.avatar}
            className="size-24 sm:size-32 ring-4 ring-background/90 shadow-2xl"
            lastActive={user.lastActive}
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              {user.username}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="size-4" />
              <span className="text-sm font-medium">
                Member since{' '}
                {new Date(user._creationTime).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          <Link to="/app/profile/edit">
            <Button
              variant="outline"
              className="gap-2 w-full sm:w-auto hover:bg-primary hover:text-primary-foreground transition-all duration-200 border-primary/30"
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
