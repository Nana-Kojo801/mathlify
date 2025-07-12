// import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import ConvexProvider from '@/integrations/convex/provider'
import AppWrapper, { useApp } from './components/app-wrapper.tsx'
import React, { useEffect, useState } from 'react'
import { useConvexAuth } from 'convex/react'
import LoadingScreen from './routes/-components/loading-screen.tsx'
import { useNetworkState } from 'react-use'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    ...TanstackQuery.getContext(),
    app: undefined!,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  const { online } = useNetworkState()
  const { isLoading } = useConvexAuth()
  const app = useApp()
  const [isConvexLoading, setIsConvexLoading] = useState(isLoading)

  useEffect(() => {
    setIsConvexLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    if(!online) setIsConvexLoading(false)
  }, [online])

  useEffect(() => {
    if (!isConvexLoading) {
      app.init()
    }
  }, [isConvexLoading])

  if (isConvexLoading || app.isInitializing) return <LoadingScreen />

  return <RouterProvider router={router} context={{ app }} />
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <TanstackQuery.Provider>
        <ConvexProvider>
          <AppWrapper>
            <App />
          </AppWrapper>
        </ConvexProvider>
      </TanstackQuery.Provider>
    </React.StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
