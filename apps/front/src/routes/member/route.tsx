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
		title: '订阅状态',
		to: '/member/a',
		icon: Handbag,
	},
	{
		title: '学习历史',
		to: '/member/a',
		icon: MonitorPlay,
	},
	{
		title: '我的课程',
		to: '/member/a',
		icon: BookOpenCheck,
	},
	// {
	// 	title: '订阅课程',
	// 	to: '/member/a',
	// },
]
function RouteComponent() {
	const { user } = useAuth()
	return <div>
		<HdHeader menu={<h1>会员中心</h1>} />
		<Layout user={user!} menus={menus} />
	</div >
}
