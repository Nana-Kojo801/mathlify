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
import { useEffect } from 'react'
import { useConvexAuth } from 'convex/react'
import LoadingScreen from './routes/-components/loading-screen.tsx'

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
  const { isLoading, isAuthenticated } = useConvexAuth()
  const app = useApp()

  useEffect(() => {
    if (!isLoading && isAuthenticated) app.init()
  }, [isLoading, isAuthenticated])

  if (isLoading || app.isInitializing) return <LoadingScreen />

  return <RouterProvider router={router} context={{ app }} />
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <TanstackQuery.Provider>
      <ConvexProvider>
        <AppWrapper>
          <App />
        </AppWrapper>
      </ConvexProvider>
    </TanstackQuery.Provider>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
