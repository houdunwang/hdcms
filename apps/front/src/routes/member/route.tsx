import { useAuth } from '@hd/react'
import { MemberLayout } from '@hd/react/member'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/member')({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({ to: '/auth/login' })
		}
	},
	component: RouteComponent,
})

function RouteComponent() {
	const { user } = useAuth()
	return <MemberLayout user={user!} />
}
