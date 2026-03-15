import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { E404 } from '@hdcms/react/errors'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    context: {
      auth: undefined!,
      queryClient: undefined!,
    },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => <E404 />
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
