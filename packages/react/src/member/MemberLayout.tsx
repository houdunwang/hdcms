import { Header } from '@/common'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import * as config from '@hdcms/config'
import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { Profile } from './Profile'
import { Bind } from './bind'

const systemRoutes = {
	'/member/bind': <Bind />,
	'/member/profile': <Profile />
}

export const useMemberClassName = (): { default: string; active: string } => {
	const isMobile = useIsMobile()
	const size = isMobile ? 'px-3 py-2' : 'px-5 py-3'
	const menuClassName = {
		default: `bg-background border-b duration-100 text-sm whitespace-nowrap ${size}`,
		active: 'lg:bg-muted text-primary'
	}
	return menuClassName
}

export function MemberLayout(): React.JSX.Element {
	const isMobile = useIsMobile()
	const location = useRouterState({ select: s => s.location })
	const href = location.href === '/member' ? '/member/bind' : location.href
	const systemPageComponent = systemRoutes[href as keyof typeof systemRoutes]

	return (
		<div>
			<Header />
			<div className={cn('bg-muted pt-6')}>
				<div className="container mx-auto px-3 lg:px-12 min-h-[calc(100vh-var(--header-height))] ">
					<div className="grid lg:grid-cols-[auto_1fr] lg:gap-6 items-start">
						{isMobile ? <MobileMenu /> : <PcMenu />}
						<Card className="bg-background">
							<CardContent>
								{systemPageComponent ? systemPageComponent : <Outlet />}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}


function MobileMenu() {
	const menuClassName = useMemberClassName()
	return <div className='flex justify-between bg-background border-t px-3 fixed bottom-0 left-0 right-0'>
		{config.menu.member?.map((menu) => (
			<Link key={menu.to}
				to={menu.to}
				className={menuClassName.default}
				activeProps={{ className: menuClassName.active }}>
				<div className="flex flex-col items-center justify-center">
					{menu.icon ? <menu.icon size={18} /> : null}
					<div className={cn("text-xs")}>
						{menu.title}
					</div>
				</div>
			</Link>
		))}
	</div>
}

function PcMenu() {
	const { user } = useAuth()
	const menuClassName = useMemberClassName()
	return <section className='hidden lg:block'>
		<Card>
			<img src={user?.avatar || '/images/avatar.jpeg'} className='w-72 object-cover max-h-72' />
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
		<div className='mt-6 flex flex-col shadow-s1m rounded-sm overflow-hidden border'>
			{config.menu.member?.map((menu) => (
				<Link key={menu.to}
					to={menu.to}
					className={menuClassName.default}
					activeProps={{ className: menuClassName.active }}>
					<div className="flex items-center gap-2">
						{menu.icon ? <menu.icon size={18} /> : null}
						{menu.title}
					</div>
				</Link>
			))}
		</div>
	</section>
}
