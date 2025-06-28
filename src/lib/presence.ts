import { useAuthUser } from '@/stores/auth-store'
import { api } from '@convex/_generated/api'
import { useMutation } from 'convex/react'
import { DateTime } from 'luxon'
import { useEffect } from 'react'

export const initPresense = () => {
  const user = useAuthUser()
  const updatePresence = useMutation(api.users.updatePresence)

  useEffect(() => {
    if (!user) return
    const interval = setInterval(
      () => {
        updatePresence({ userId: user._id })
      },
      1000 * 10,
    )

    return () => {
      clearInterval(interval)
    }
  }, [user])
}

export const isActive = (lastActive: number) => {
  const now = DateTime.now()
  const active = DateTime.fromMillis(lastActive)
  const diff = active.diff(now).as("seconds")
  return diff < 15
}
