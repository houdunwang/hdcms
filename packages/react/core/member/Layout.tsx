import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Data } from '@app/admin/data'
import { Link, Outlet, useMatch, useMatchRoute } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { Profile } from './Profile'
import { Bind } from './bind'
import type { ReactNode } from 'react'

const Menus = [
	{ name: 'profile', title: '资料管理', to: '/member?system=profile' },
	{ name: 'bind', title: '绑定帐号', to: '/member?system=bind' },
] as const
export type SystemMenuName = typeof Menus[number]['name']

interface Props {
	user: Data.User
	className?: string
	children?: ReactNode
}
export const menuClassName = {
	default: 'bg-background border-b py-3 px-5 duration-100 text-sm',
	active: 'bg-destructive text-primary-foreground'
}
// return cn('bg-background border-b py-3 px-5 duration-100 text-sm', {
// 	'bg-destructive text-primary-foreground': state
// })

export function Layout({ user, className, children }: Props) {
	const route = useMatch({ strict: false })
	const matchRoute = useMatchRoute()
	let systemMenu = route.search.system as SystemMenuName | undefined
	const isRootPath = matchRoute({ to: '/member' });
	if (!systemMenu && isRootPath) {
		systemMenu = 'profile'
	}
	return <div className={cn('bg-muted pt-6', className)}>
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
						{Menus.map((menu: typeof Menus[number]) => (
							<Link key={menu.name}
								to={menu.to}
								className={cn(menuClassName.default, {
									[menuClassName.active]: systemMenu === menu.name
								})}
							>
								{menu.title}
							</Link>
						))}
						{children}
					</div>
				</section>
				<Card className="bg-background">
					<CardContent>
						{systemMenu ? (systemMenu == 'bind' ? <Bind /> : <Profile />) : <Outlet />}
					</CardContent>
				</Card>
			</div>
		</div>
	</div>
}
