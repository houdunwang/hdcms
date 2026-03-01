import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { menus } from '@/config/menus'
import { HdHeader } from '@core/components/common/hdHeader'
import { useAuth } from '@core/hooks/useAuth'
import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import dayjs from 'dayjs'

export const Route = createFileRoute('/member')({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({ to: '/auth/login' })
		}
	},
	component: RouteComponent,
})

const navigateMenus = [
	{ title: '资料管理', to: '/member/profile' },
	{ title: '绑定帐号', to: '/member/bind' },
]
function RouteComponent() {
	const { user } = useAuth()
	return <div>
		<HdHeader menus={menus} />
		<div className="bg-muted pt-6">
			<div className="container mx-auto px-12 min-h-[calc(100vh-var(--header-height))] ">
				<div className="grid lg:grid-cols-[auto_1fr] lg:gap-6 items-stretch">
					<section className='hidden lg:block'>
						<Card>
							<img src={user?.avatar || ''} />
							<CardHeader>
								<CardTitle className='text-center'>
									{user?.name || ''}
								</CardTitle>
								<CardDescription className='text-center'>
									注册于 {dayjs(user!.createdAt).fromNow()}
									<br />
									UID: {user?.id}
								</CardDescription>
							</CardHeader>
						</Card>
						<div className='mt-6 flex flex-col shadow-s1m rounded-sm overflow-hidden'>
							{navigateMenus.map(menu => (
								<Link to={menu.to} key={menu.title}
									activeProps={{ className: 'bg-destructive text-primary-foreground' }}
									activeOptions={{ exact: true }}
									className='bg-background border-b py-3 px-5 duration-100 text-sm'>
									{menu.title}
								</Link>
							))}
						</div>
					</section>
					<Card className="bg-background">
						<CardContent>
							<Outlet />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	</div>
}
