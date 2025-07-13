import { Skeleton } from '@/components/ui/skeleton'

const FriendRequestsSkeleton = () => {
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

export default FriendRequestsSkeleton
