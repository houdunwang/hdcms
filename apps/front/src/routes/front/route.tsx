import { FrontLayout } from '@hdcms/react/layouts'
import type { RouterContextConfig } from '@hdcms/react/types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/front')({
	component: RouteComponent,
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
	return <>
		<FrontLayout />
	</>
}
