import type { PropsWithChildren } from 'react'
import LoadingScreen from '@/routes/-components/loading-screen'
import AuthProvider, { useAuth } from './auth-provider'
import InitializationProvider from './initialization-provider'
import { useInitStore } from '@/stores/init-store'
import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'

function AppLoadingWrapper({ children }: PropsWithChildren) {
  const { loading: authLoading } = useAuth()
  const { isInitializing } = useInitStore()
  const [showContent, setShowContent] = useState(false)
  
  useEffect(() => {
    if (!authLoading && !isInitializing) {
      // Add a 1.5s delay after initialization is complete
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 1500)
      
      return () => clearTimeout(timer)
    } else {
      setShowContent(false)
    }
  }, [authLoading, isInitializing])
  
  return (
    <div className="relative w-full h-full">
      <Transition
        show={authLoading || isInitializing || !showContent}
        as="div"
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute inset-0 z-50"
      >
        <LoadingScreen />
      </Transition>
      
      <Transition
        show={showContent}
        as="div"
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="h-full"
      >
        {children}
      </Transition>
    </div>
  )
}

export default function MathlifyWrapper({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <InitializationProvider>
        <AppLoadingWrapper>
          {children}
        </AppLoadingWrapper>
      </InitializationProvider>
    </AuthProvider>
  )
}
