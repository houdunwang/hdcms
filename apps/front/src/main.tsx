import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { routeTree } from './routeTree.gen'
import { HdProvider } from '@hdcms/react/provider'
import { E404 } from '@hdcms/react/errors'

const router = createRouter({
  context: {
    auth: undefined!,
    queryClient: undefined!,
    config: {
      title: '',
    }
  },
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultNotFoundComponent: () => <E404 />,
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

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<HdProvider router={router} queryClient={queryClient} />)
}
