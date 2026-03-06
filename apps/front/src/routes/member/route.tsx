import { HeaderBar } from '@/components/HeaderBar'
import { useAuth } from '@houdunyun/react'
import { Layout } from '@houdunyun/react/member'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Handbag } from 'lucide-react'

export const Route = createFileRoute('/member')({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({ to: '/auth/login' })
		}
	},
	component: RouteComponent,
})

const menus = [
	{
		title: '获取帮助',
		to: 'https://www.houdunren.com',
		icon: Handbag,
	},
]
function RouteComponent() {
	const { user } = useAuth()
	return <div>
		<HeaderBar />
		<Layout user={user!} menus={menus} />
	</div >
}
