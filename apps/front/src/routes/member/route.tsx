import { HdHeader, useAuth } from '@houdunyun/react'
import { Layout } from '@houdunyun/react/member'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { BookOpenCheck, Handbag, MonitorPlay, SubscriptIcon } from 'lucide-react'

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
		<HdHeader menu={<h1>会员中心</h1>} />
		<Layout user={user!} menus={menus} />
	</div >
}
