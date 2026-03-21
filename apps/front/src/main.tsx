import { HdProvider } from '#core/provider'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
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
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: (_error, query) => {
      if (query.meta?.skipGlobalError) return
      // toast.error('查询失败')
    },
  }),
  mutationCache: new MutationCache({
    onError: (_error, _variables, _context, mutation) => {
      if (mutation.meta?.skipGlobalError) return
      // toast.error('提交失败')
    },
  }),
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
