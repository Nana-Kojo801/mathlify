import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PageHeaderProps {
  backLink?: string
  className?: string
  children?: React.ReactNode
  showBackButton?: boolean
  backButtonVariant?: 'icon' | 'text'
  title?: string
  rightContent?: React.ReactNode
}

export function PageHeader({
  backLink,
  className = '',
  children,
  showBackButton = false,
  backButtonVariant = 'icon',
  title,
  rightContent,
}: PageHeaderProps) {
  return (
    <header className={`sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 ${className}`}>
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Link to={backLink}>
              {backButtonVariant === 'icon' ? (
                <Button size="icon" variant="ghost" className="rounded-full">
                  <ArrowLeft className="size-5" />
                </Button>
              ) : (
                <div className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <ArrowLeft className="size-5 text-primary" />
                  {title && <span className="text-xl font-bold text-primary">{title}</span>}
                </div>
              )}
            </Link>
          )}
          
          {children ? (
            children
          ) : title && !children ? (
            <span className="text-xl font-bold">{title}</span>
          ) : null}
        </div>

        {rightContent && <div>{rightContent}</div>}
      </div>
    </header>
  )
}