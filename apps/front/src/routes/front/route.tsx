import { FrontLayout } from '@core/layouts'
import type { RouterContextConfig } from '@core/types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/front')({
	component: RouteComponent,
	notFoundComponent: () => <RouteComponent />,
	beforeLoad() {
		return {
			config: {
				title: '订阅会员-router',
				showHeader: false,
			} as RouterContextConfig
		}
	}
})

function RouteComponent() {
	return <FrontLayout />
}
