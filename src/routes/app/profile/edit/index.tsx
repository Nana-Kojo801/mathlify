import { createFileRoute } from '@tanstack/react-router'
import { Camera, Save, User, Lock } from 'lucide-react'
import { useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { useUser } from '@/hooks/user'
import { useAppForm } from '@/hooks/form'
import type { z } from 'zod'
import { authSchema } from '@/components/auth-form'
import { PageHeader } from '@/components/page-header'
import { useAuth } from '@/components/app-wrapper'

export const Route = createFileRoute('/app/profile/edit/')({
  component: EditProfilePage,
})

function EditProfilePage() {
  const user = useUser()
  const [previewAvatar, setPreviewAvatar] = useState<File | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const editProfile = useAuth(state => state.editProfile)

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
    <div className="fixed inset-0 z-20 overflow-auto min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <PageHeader title="Edit" showBackButton backLink="/app/profile" />

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 sm:px-6 max-w-xl mx-auto w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="space-y-8"
        >
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <input
                id="avatar"
                type="file"
                onChange={handleAvatarChange}
                className="hidden"
                accept="image/*"
              />
              <div className="relative rounded-full p-1 bg-gradient-to-br from-primary to-secondary">
                <img
                  ref={imageRef}
                  src={user.avatar}
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-4 border-background object-cover"
                />
                <label
                  htmlFor="avatar"
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <div className="bg-background p-3 rounded-full shadow-lg">
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                </label>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Member since{' '}
                {new Date(user._creationTime).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="username" className="text-muted-foreground">
                Username
              </Label>
              <form.AppField
                name="username"
                children={(field) => (
                  <field.TextField
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    className="pl-10 h-12"
                  >
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </field.TextField>
                )}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-muted-foreground">
                Password
              </Label>
              <form.AppField
                name="password"
                children={(field) => (
                  <field.TextField
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className="pl-10 h-12"
                  >
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </field.TextField>
                )}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6">
            <form.AppForm>
              <form.SubscribeButton className="w-full h-12">
                {form.state.isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-background border-t-primary" />
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </div>
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
