import { ThemeProvider } from '@/components/theme/theme-provider'
import type { useAuth } from '@/hooks/useAuth'
import { queryClient } from '@/lib/client'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { createFormHookContexts } from '@tanstack/react-form'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { Toaster } from '@/components/ui/sonner'
import '../assets/global.css'
import '../assets/shadcn.css'
export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()
interface RootRouteContext {
  auth: ReturnType<typeof useAuth>
  queryClient: QueryClient
}
export const Route = createRootRouteWithContext<RootRouteContext>()({
  beforeLoad: async ({ context }) => {
    context.auth.getCurrentUser()
  },
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Outlet />
          <Toaster position='top-center' />
        </ThemeProvider>
      </QueryClientProvider>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}

