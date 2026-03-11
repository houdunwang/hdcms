import type { RouterContextConfig } from '@houdunyun/react/types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
	component: RouteComponent,
	beforeLoad() {
		return {
			config: {
				title: 'dashboard',
			}
		} as RouterContextConfig
	},
})

function RouteComponent() {
	return <div>Hello "/admin/"!</div>
}
