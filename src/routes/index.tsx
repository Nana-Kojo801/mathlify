import { createFileRoute, Navigate, Link } from '@tanstack/react-router'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import Logo from '@/logo.svg'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const { loading, authenticated } = useAuth()

  if(!loading && authenticated) return <Navigate to='/app' />

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Minimal Header */}
      <header className="w-full py-6 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Mathify Logo" className="h-8 w-8" />
          <span className="text-xl font-medium">Mathify</span>
        </div>
        <Link to="/auth/login">
          <Button variant="outline" className='py-2 w-[120px]'>
            Log in
          </Button>
        </Link>
      </header>

      {/* Single Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Animated Logo */}
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-lg opacity-75 animate-pulse"></div>
            <div className="relative bg-background p-6 rounded-2xl inline-flex">
              <img src={Logo} alt="Mathify Logo" className="h-16 w-16" />
            </div>
          </div>

          {/* Minimal Heading */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Sharpen your <span className="text-primary">mind</span> with numbers
          </h1>

          {/* Simple Description */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            Mathify helps you develop lightning-fast mental math skills through
            focused practice.
          </p>

          {/* Primary CTA */}
          <div className="pt-6">
            <Link to="/auth/signup">
              <Button size="lg" className="px-8 h-12 text-base">
                Start Practicing Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 px-6 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Mathify. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
