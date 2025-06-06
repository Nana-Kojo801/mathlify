import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/user-avatar'
import { useUser } from '@/hooks/user'
import { Link } from '@tanstack/react-router'
import { Edit } from 'lucide-react'

const ProfileHeader = () => {
  const user = useUser()
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center space-x-4">
        <UserAvatar className='size-12' username={user.username} avatar={user.avatar} />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">{user.username}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Joined {new Date(user._creationTime).toDateString()}
          </p>
        </div>
      </div>

      <Link to='/app/profile/edit'>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </Link>
    </div>
  )
}

export default ProfileHeader
