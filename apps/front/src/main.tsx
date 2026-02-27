import { useApi } from '@core/hooks/useApi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { useAuth } from '../core/hooks/useAuth'
import { routeTree } from './routeTree.gen'
import '@core/index'

const router = createRouter({
  context: {
    auth: undefined!,
    queryClient: undefined!,
  },
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
})
// const queryClient = new QueryClient()
const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}

function App() {
  const { TanstackQueryClientProvider } = useApi()

  return (
    <TanstackQueryClientProvider>
      <QueryClientProvider client={queryClient}>
        <RouterContextProvider />
      </QueryClientProvider>
      {/* <RouterProvider router={router} context={{ auth, queryClient }} /> */}
    </TanstackQueryClientProvider>
  )
}

function RouterContextProvider() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth, queryClient }} />
}