import { app } from '#config/app.tsx'
import { headerMenus } from '#config/header.tsx'
import { userDropMenus } from '#config/user.tsx'
import { AuthLayout } from '#core/auth'
import { Footer, Header } from '#core/common'
import { UserDropdown } from '#core/user/UserDropdown.tsx'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
	beforeLoad: ({ context }) => {
		if (context.auth.isAuthenticated(true)) {
			throw redirect({ to: '/' })
		}
	},
	component: RouteComponent,
})

function RouteComponent() {
	return <div className=''>
		<Header config={app} menus={headerMenus} right={<UserDropdown menus={userDropMenus} />} />
		<AuthLayout className="container mx-auto mt-20 p-3 min-h-[calc(100vh-var(--header-height))]"
		>
			<Outlet />
		</AuthLayout>
		<Footer config={app} />
	</div>
}
