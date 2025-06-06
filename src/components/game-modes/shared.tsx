import type { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import type { VariantProps } from 'class-variance-authority'

export const ResultLayout = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  return (
    <div
      className={cn(
        'w-full h-full flex flex-col items-center justify-center text-white p-6',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const ActionLayout = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  return <div className={cn('grid grid-cols-2 gap-4 mt-8', className)}>{children}</div>
}

export const ActionButton = ({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) => {
  return (
    <Button
      className={cn(
        'py-6 w-full text-lg',
        buttonVariants({ variant, size, className }),
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

export const StatItem = ({
    label,
    value,
    className = '',
  }: {
    label: string
    value: string | number
    className?: string
  }) => (
    <div
      className={cn(
        'flex flex-col items-center bg-gray-700 p-3 rounded-md',
        className,
      )}
    >
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  )
  
export const StatsGrid = ({ children, className }: PropsWithChildren & { className?: string }) => {
    return <div className={cn('grid grid-cols-2 gap-4 w-full mt-8 max-w-md bg-card p-4 rounded-xl', className)}>{children}</div>
}