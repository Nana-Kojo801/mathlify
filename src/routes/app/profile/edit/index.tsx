import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Camera, Save, User, Lock } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useUser } from '@/hooks/user'
import { useAppForm } from '@/hooks/form'
import type { z } from 'zod'
import { authSchema } from '@/components/auth-form'
import { useAuth } from '@/components/auth-provider'

export const Route = createFileRoute('/app/profile/edit/')({
  component: EditProfilePage,
})

function EditProfilePage() {
  const user = useUser()
  const { editProfile } = useAuth()
  const [previewAvatar, setPreviewAvatar] = useState<File | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const form = useAppForm({
    defaultValues: {
      username: user.username,
      password: user.password,
    } as z.infer<typeof authSchema>,
    validators: { onChange: authSchema },
    onSubmit: async ({ value: values }) => {
      await editProfile({ ...values, avatar: previewAvatar })
    },
  })

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(new Blob([file], { type: file.type }))
    imageRef.current!.src = url
    setPreviewAvatar(file)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link to="/app/profile">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <span className="text-xl font-bold text-primary">Edit Profile</span>
          </div>
          <Button
            variant="default"
            size="sm"
            className="px-3"
            onClick={() => {}}
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 sm:px-6 max-w-xl mx-auto w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="space-y-8"
        >
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="relative">
              <input
                id="avatar"
                type="file"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <img
                ref={imageRef}
                src={user.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-primary"
              />
              <label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 rounded-full p-2 bg-secondary"
              >
                <Camera className="w-4 h-4" />
              </label>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Member since {new Date(user._creationTime).toDateString()}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6 flex flex-col items-center">
            <div className="space-y-2 w-full max-w-md">
              <Label htmlFor="username">Username</Label>
              <form.AppField
                name="username"
                children={(field) => (
                  <field.TextField
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    className="pl-10"
                  >
                    <User className="absolute z-10 left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </field.TextField>
                )}
              />
            </div>
            <div className="space-y-2 w-full max-w-md">
              <Label htmlFor="password">Password</Label>
              <form.AppField
                name="password"
                children={(field) => (
                  <field.TextField
                    id="password"
                    placeholder="Enter password"
                    className="pl-10"
                  >
                    <Lock className="absolute z-10 left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </field.TextField>
                )}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-6 w-full max-w-md mx-auto">
            <Link to="/app/profile">
              <Button variant="destructive" type="button" className="w-full">
                Cancel
              </Button>
            </Link>
            <form.AppForm>
              <form.SubscribeButton className="w-full">
                {form.state.isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-primary" />
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save />
                    Save changes
                  </>
                )}
              </form.SubscribeButton>
            </form.AppForm>
          </div>
        </form>
      </main>
    </div>
  )
}

export default EditProfilePage
