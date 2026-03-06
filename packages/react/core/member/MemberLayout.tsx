import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import type { Data } from '@app/admin/data'
import { Link, Outlet, useMatch, useMatchRoute } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { Dock, UserStar, type LucideIcon } from 'lucide-react'
import { Profile } from './Profile'
import { Bind } from './bind'
import type { ILinkItem } from '@core/components/types'

const SystemMenus = [
	{ name: 'profile', title: '资料管理', to: '/member?system=profile', icon: UserStar },
	{ name: 'bind', title: '绑定帐号', to: '/member?system=bind', icon: Dock },
] as Array<ILinkItem & { name: 'profile' | 'bind' }>
export type SystemMenuName = typeof SystemMenus[number]['name'] | undefined

interface Props {
	user: Data.User
	className?: string
	menus?: Array<ILinkItem>
}
export const useMemberClassName = () => {
	const isMobile = useIsMobile()
	const size = isMobile ? 'px-3 py-2' : 'px-5 py-3'
	const menuClassName = {
		default: `bg-background border-b duration-100 text-sm whitespace-nowrap hover:bg-muted ${size}`,
		active: 'lg:bg-destruct1ive text-primary'
	}
	return menuClassName
}

export function MemberLayout({ user, className, menus }: Props) {
	const isMobile = useIsMobile()
	const route = useMatch({ strict: false })
	const matchRoute = useMatchRoute()
	let systemMenu = route.search.system as SystemMenuName | undefined
	const isRootPath = matchRoute({ to: '/member' });
	if (!systemMenu && isRootPath) {
		systemMenu = 'profile'
	}
	return <div className={cn('bg-muted pt-6', className)}>
		<div className="container mx-auto px-3 lg:px-12 min-h-[calc(100vh-var(--header-height))] ">
			<div className="grid lg:grid-cols-[auto_1fr] lg:gap-6 items-stretch">
				{isMobile ?
					<MobileLeft systemMenu={systemMenu} menus={menus} />
					:
					<PcLeft user={user} systemMenu={systemMenu} menus={menus} />
				}
				<Card className="bg-background">
					<CardContent className='pb-20'>
						{systemMenu ? (systemMenu == 'bind' ? <Bind /> : <Profile />) : <Outlet />}
					</CardContent>
				</Card>
			</div>
		</div>
	</div>
}

interface LeftMenuProps {
	user: Data.User
	systemMenu: SystemMenuName
	menus?: Array<{ title: string, to: string, icon?: LucideIcon }>
}

function MobileLeft({ systemMenu, menus }: Omit<LeftMenuProps, 'user'>) {
	const menuClassName = useMemberClassName()
	return <div className='flex justify-between bg-background border-t px-3 fixed bottom-0 left-0 right-0'>
		{SystemMenus.map((menu: typeof SystemMenus[number]) => (
			<Link key={menu.name}
				to={menu.to}
				className={cn(menuClassName.default, {
					[menuClassName.active]: systemMenu === menu.name
				})}
			>
				<div className="flex flex-col items-center justify-center">
					{menu.icon ? <menu.icon size={18} /> : null}
					<div className={cn("text-xs")}>
						{menu.title}
					</div>
				</div>
			</Link>
		))}
		{menus?.map((menu: typeof menus[number]) => (
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

function PcLeft({ user, systemMenu, menus }: LeftMenuProps) {
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
			{SystemMenus.map((menu: typeof SystemMenus[number]) => (
				<Link key={menu.name}
					to={menu.to}
					className={cn(menuClassName.default, {
						[menuClassName.active]: systemMenu === menu.name
					})}
				>
					<div className="flex items-center gap-2 size-sm">
						{menu.icon ? <menu.icon size={18} /> : null}
						{menu.title}
					</div>
				</Link>
			))}
			{menus?.map((menu: typeof menus[number]) => (
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
