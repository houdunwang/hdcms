import { useApi } from '@core/hooks/useApi'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { createFormHookContexts } from '@tanstack/react-form'
import { QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import type { useAuth } from 'core/hooks/useAuth'
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
  const { TanstackQueryClientProvider } = useApi()
  return (
    <>
      <TanstackQueryClientProvider>
        <Outlet />
      </TanstackQueryClientProvider>
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

