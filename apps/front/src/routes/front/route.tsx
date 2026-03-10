import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import type { RouterContextConfig } from '@houdunyun/react/types'
import { HeaderBar } from '@/components/common/HeaderBar'
import { FooterComponent } from '@/components/common/FooterComponent'

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
		<HeaderBar />
		<div className="container mx-auto mt-12 min-h-[calc(100vh-var(--header-height))]">
			<Outlet />
		</div>
		<FooterComponent />
	</>
}
