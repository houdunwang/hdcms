import { HdProvider } from '#core/provider'
import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import './assets/global.css'
import { routeTree } from './routeTree.gen'

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
})
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    },
  },
})
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  // const root = ReactDOM.createRoot(rootElement)
  // root.render(<RouterProvider router={router} />)
  const root = ReactDOM.createRoot(rootElement)
  root.render(<HdProvider router={router} queryClient={queryClient} />)
}
