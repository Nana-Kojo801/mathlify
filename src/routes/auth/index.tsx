import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { useAuthActions } from '@convex-dev/auth/react'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { signIn } = useAuthActions()

  const signInMutation = useMutation({
    mutationFn: async () => await signIn('google'),
  })

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      {/* Back to Home */}
      <div className="p-4 sm:p-6">
        <Link
          to="/"
          className="text-sm sm:text-base text-foreground flex items-center gap-2 font-medium"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Back to home
        </Link>
      </div>
      {/* Centered Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-xs sm:max-w-md flex flex-col items-center px-2 sm:px-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-2 sm:mb-4 text-center leading-tight">
            Welcome to <span className="text-primary">Mathlify</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 text-center font-medium max-w-xs sm:max-w-md">
            Sign in to unlock your math potential.
            <br className="hidden sm:block" />
            Compete, practice, and track your progress—all in one place.
          </p>
          <Button
            onClick={() => signInMutation.mutate()}
            className="w-full max-w-xs sm:max-w-sm text-sm sm:text-base font-semibold flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 rounded-x"
            variant="outline"
          >
            {signInMutation.isPending ? (
              <Spinner />
            ) : (
              <span className="flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <g clipPath="url(#clip0_17_40)">
                    <path
                      d="M23.766 12.276c0-.818-.074-1.603-.212-2.356H12.24v4.482h6.48c-.28 1.482-1.12 2.74-2.384 3.59v2.98h3.852c2.26-2.082 3.578-5.15 3.578-8.696z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12.24 24c3.24 0 5.96-1.07 7.946-2.91l-3.852-2.98c-1.07.72-2.44 1.15-4.094 1.15-3.146 0-5.81-2.124-6.77-4.978H1.48v3.09C3.46 21.78 7.54 24 12.24 24z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.47 14.282A7.267 7.267 0 0 1 4.8 12c0-.792.136-1.56.37-2.282V6.628H1.48A11.97 11.97 0 0 0 0 12c0 1.98.48 3.85 1.48 5.372l3.99-3.09z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.24 4.77c1.77 0 3.35.61 4.6 1.81l3.44-3.44C18.194 1.07 15.48 0 12.24 0 7.54 0 3.46 2.22 1.48 6.628l3.99 3.09c.96-2.854 3.624-4.978 6.77-4.978z"
                      fill="#EA4335"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_17_40">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Continue with Google
              </span>
            )}
          </Button>
          <p className="text-xs sm:text-sm text-muted-foreground text-center mt-6 sm:mt-8 max-w-xs sm:max-w-sm">
            By continuing, you agree to our{' '}
            <a href="#" className="underline hover:text-primary">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="underline hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
