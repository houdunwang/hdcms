import type { useAuth } from '#core/hooks'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { useTitle } from 'ahooks'
import { app } from '@/config/app'

interface RootRouteContext {
  auth: ReturnType<typeof useAuth>
  queryClient: QueryClient,
  config?: {
    title?: string,
  }
  // getTitle: () => string,
}
export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,
})

function RootComponent() {
  const matches = useRouterState({ select: (s) => s.matches })
  // 网站标题设置
  const matchWithTitle = [...matches]
    .reverse()
    .find((match) => match.context.config?.title)
  const title = matchWithTitle?.context.config?.title
  useTitle(title ? title + ' - ' + app.appName : app.appName || '');

  return (
    <>
      <Outlet />
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

