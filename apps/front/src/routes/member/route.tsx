import { MemberLayout } from '@houdunyun/react/member'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/member')({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated(true)) {
			throw redirect({ to: '/auth' })
		}
	},
	component: RouteComponent,
})

function RouteComponent() {
	return <div>
		<MemberLayout />
	</div >
}
