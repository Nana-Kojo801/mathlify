import { cn } from '@/lib/utils'

const Spinner = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        'h-4 w-4 animate-spin rounded-full border-2 border-background border-t-primary',
        className,
      )}
    />
  )
}

export default Spinner
