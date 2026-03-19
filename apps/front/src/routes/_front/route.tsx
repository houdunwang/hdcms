import { app } from '#config/app'
import { headerMenus } from '#config/header'
import { userDropMenus } from '#config/user'
import { Footer, Header } from '#core/common'
import { FrontLayout } from '#core/layouts'
import type { RouterContextConfig } from '#core/types'
import { UserDropdown } from '#core/user'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_front')({
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
	return <>
		<Header config={app} menus={headerMenus} right={<UserDropdown menus={userDropMenus} />} />
		<FrontLayout className='max-w-[100vw]' >
			<Outlet />
		</FrontLayout>
		<Footer config={app} />
	</>
}
