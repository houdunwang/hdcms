import { MemberLayout } from '@hdcms/react/layouts'
import { createFileRoute, redirect } from '@tanstack/react-router'

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
	return <MemberLayout />
}
