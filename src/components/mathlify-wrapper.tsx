import type { PropsWithChildren } from 'react'
import AuthProvider, { useAuth } from './auth-provider'
import LoadingScreen from '@/routes/-components/loading-screen'

function InitializationWrapper({ children }: PropsWithChildren) {
  const { loading, syncing } = useAuth()

  if(loading || syncing) return <LoadingScreen />

  return children
}

export default function MathlifyWrapper({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <InitializationWrapper>{children}</InitializationWrapper>
    </AuthProvider>
  )
}
