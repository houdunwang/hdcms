import { Profile } from '#core/member/Profile.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/member/profile')({
	component: RouteComponent,
})

function RouteComponent() {
	return <Profile />
}
