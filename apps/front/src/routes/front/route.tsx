import { Footer, Header } from '@hdcms/react/common'
import { FrontLayout } from '@hdcms/react/front'
import type { RouterContextConfig } from '@hdcms/react/types'
import { createFileRoute, Outlet } from '@tanstack/react-router'

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
		{/* <Header />
		<div className="container mx-auto mt-12 min-h-[calc(100vh-var(--header-height))]">
			<Outlet />
		</div>
		<Footer /> */}
	</>
}
