import { createFileRoute, Link, Navigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import Logo from '@/logo.svg'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/components/app-wrapper'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const isAuthenticated = useAuth(state => state.authenticated)
  const [showAuthChangeModal, setShowAuthChangeModal] = useState(
    !!localStorage.getItem('mathlify-session'),
  )

  if (isAuthenticated) return <Navigate to="/app" />

  return (
    <>
      {/* Auth Change Modal (custom, not Dialog) */}
      {showAuthChangeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-lg shadow-2xl border w-full max-w-xs sm:max-w-md px-4 py-6 sm:p-6 mx-2 flex flex-col gap-5">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-lg font-bold">
                Authentication System Updated
              </h2>
              <p className="text-muted-foreground text-sm">
                Mathlify now uses Google for authentication. For security and a
                better experience, you'll need to sign up again using your
                Google account. Your old account will no longer work.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-3 mt-2">
              <Link
                to="/auth"
                className="w-full"
                onClick={() => {
                  localStorage.removeItem('mathlify-session')
                  setShowAuthChangeModal(false)
                }}
              >
                <Button className="w-full font-bold block" size="lg">
                  Sign up with Google
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="font-semibold block"
                onClick={() => setShowAuthChangeModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Main landing page content */}
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        {/* Header */}
        <header className="w-full flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src={Logo}
              alt="Mathlify Logo"
              className="h-8 w-8 sm:h-9 sm:w-9"
            />
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-primary">
              Mathlify
            </span>
          </div>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link to="/auth">
              <Button
                variant="outline"
                className="font-semibold px-4 py-2 sm:px-6 sm:py-2 shadow-sm text-sm sm:text-base"
              >
                Log in
              </Button>
            </Link>
          </nav>
        </header>
        {/* Main Section */}
        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-md sm:max-w-xl mx-auto flex flex-col items-center text-center gap-6 sm:gap-8 py-12 sm:py-20">
            {/* Modern logo presentation */}
            <div className="mb-3 sm:mb-4 flex items-center justify-center">
              <div className="rounded-full bg-background/80 backdrop-blur-sm p-5 sm:p-8 shadow-lg flex items-center justify-center">
                <img
                  src={Logo}
                  alt="Mathlify Logo"
                  className="h-14 w-14 sm:h-20 sm:w-20 drop-shadow-md"
                />
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-foreground mb-1 sm:mb-2">
              Master Mental Math with Mathlify
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-xs sm:max-w-lg mx-auto mb-4 sm:mb-6 tracking-tight">
              Mathlify is the next-generation platform for sharpening your
              calculation skills through real-time challenges, social
              competition, and beautiful analytics. Join a global community and
              climb the leaderboards!
            </p>
            <Link to="/auth">
              <Button
                size="default"
                className="px-6 sm:px-8 h-10 sm:h-12 text-sm sm:text-base font-bold"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}
