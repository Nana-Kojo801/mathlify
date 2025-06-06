import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import Logo from '@/logo.svg'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      {/* Back button */}
      <div className="relative z-10 pt-6 pl-6">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/' })}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={18} />
          <span>Back to home</span>
        </Button>
      </div>

      {/* Main content area */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-12">
        {/* Header with logo */}
        <header className="w-full max-w-md mb-8">
          <div className="flex justify-center">
            <img src={Logo} className="h-16 w-16" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Mathlify
          </h1>
        </header>

        {/* Auth form container */}
        <main className="w-full max-w-md">
          <Outlet />
        </main>

        {/* Footer links */}
        <footer className="w-full max-w-md mt-8 text-center text-sm text-muted-foreground">
          <p>
            By continuing, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
