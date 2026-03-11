import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import type { RouterContextConfig } from '@houdunyun/react/types'
import { Footer, Header } from '@houdunyun/react/common'

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
		<Header />
		<div className="container mx-auto mt-12 min-h-[calc(100vh-var(--header-height))]">
			<Outlet />
		</div>
		<Footer />
	</>
}
