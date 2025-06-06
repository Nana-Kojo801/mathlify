import { Lock, User, Eye, EyeOff } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAppForm } from '@/hooks/form'
import { z } from 'zod'
import { useAuth } from './auth-provider'

export type AuthFormProps = {
  type: 'signup' | 'login'
}

export const authSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username should be at least 3 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password is must be at least 8 characters' }),
})

const AuthForm = ({ type }: AuthFormProps) => {
  const { signup, login } = useAuth()
  const navigate = useNavigate()

  const isSignup = useMemo(() => type === 'signup', [type])

  const [showPassword, setShowPassword] = useState(false)
  const form = useAppForm({
    defaultValues: {
      username: '',
      password: '',
    } as z.infer<typeof authSchema>,
    validators: {
      onChange: authSchema,
    },
    onSubmit: async ({ value: values }) => {
      if(isSignup) {
        const success = await signup(values)
        if(success) navigate({ to: '/app' })
      } else {
        const success = await login(values)
        if(success) navigate({ to: '/app' })
      }
    },
  })

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">
          {isSignup ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className="text-muted-foreground">
          {isSignup
            ? 'Join Mathlify to sharpen your skills'
            : 'Continue your mental math journey'}
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <form.AppField
            name="username"
            children={(field) => (
              <field.TextField
                id="username"
                placeholder="Enter username"
                className="pl-10"
              >
                <User className="absolute z-10 left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </field.TextField>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <form.AppField
            name="password"
            children={(field) => (
              <field.TextField
                id="password"
                placeholder="Enter password"
                type={showPassword ? 'text' : 'password'}
                className="pl-10"
              >
                <Lock className="absolute z-10 left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                {showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(false)}
                    className="absolute z-10 right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(true)}
                    className="absolute z-10 right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  />
                )}
              </field.TextField>
            )}
          />
        </div>

        <form.AppForm>
          <form.SubscribeButton className="w-full mt-2">
            {form.state.isSubmitting ? (
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-primary" />
                {isSignup ? 'Creating account...' : 'Signing in...'}
              </div>
            ) : isSignup ? (
              'Get Started'
            ) : (
              'Continue'
            )}
          </form.SubscribeButton>
        </form.AppForm>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {isSignup ? (
          <>
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <Link
              to="/auth/signup"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </>
        )}
      </p>
    </div>
  )
}

export default AuthForm
