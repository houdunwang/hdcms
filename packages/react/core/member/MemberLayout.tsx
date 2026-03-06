import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Data } from '@app/admin/data'
import { Link, Outlet } from '@tanstack/react-router'
import dayjs from 'dayjs'

const navigateMenus = [
	{ title: '资料管理', to: '/member/profile' },
	{ title: '绑定帐号', to: '/member/bind' },
]
export function MemberLayout({ user }: { user: Data.User }) {
	return <div className="bg-muted pt-6">
		<div className="container mx-auto px-12 min-h-[calc(100vh-var(--header-height))] ">
			<div className="grid lg:grid-cols-[auto_1fr] lg:gap-6 items-stretch">
				<section className='hidden lg:block'>
					<Card>
						<img src={user?.avatar || '/images/avatar.jpeg'} className='w-72 object-cover' />
						<CardHeader>
							<CardTitle className='text-center'>
								{user?.name || ''}
							</CardTitle>
							<CardDescription className='text-center'>
								注册于 {dayjs(user?.createdAt).fromNow()}
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
}
