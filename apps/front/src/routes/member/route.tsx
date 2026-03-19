import { app } from '#config/app.tsx'
import { headerMenus } from '#config/header.tsx'
import { memberMenus } from '#config/member.tsx'
import { userDropMenus } from '#config/user.tsx'
import { Header } from '#core/common/Header.tsx'
import { MemberLayout } from '#core/layouts'
import { UserDropdown } from '#core/user/UserDropdown.tsx'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/member')({
	component: RouteComponent,
	notFoundComponent: () => <div>ddd11111111dd</div>,
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated(true)) {
			throw redirect({ to: '/auth' })
		}
	},
})

function RouteComponent() {
	return <>
		<Header config={app} menus={headerMenus} right={<UserDropdown menus={userDropMenus} />} />
		<MemberLayout menus={memberMenus}>
			<Outlet />
		</MemberLayout>
	</>
}
