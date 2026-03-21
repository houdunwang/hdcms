import { useAuth } from '#core/hooks'
import { useIsMobile } from '#core/hooks/use-mobile'
import type { MenuType } from '#core/types'
import { UserIcon } from '#core/user/UserIcon.tsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import type { ComponentProps, FC, PropsWithChildren } from 'react'

export const useMemberClassName = (): { default: string; active: string } => {
	const isMobile = useIsMobile()
	const size = isMobile ? 'px-3 py-2' : 'px-5 py-3'
	const menuClassName = {
		default: `bg-background border-b duration-100 text-sm whitespace-nowrap ${size}`,
		active: 'lg:bg-muted text-primary'
	}
	return menuClassName
}

export type MemberMenusType = MenuType[]
type Props = {
	menus: MemberMenusType
}

export const MemberLayout: FC<ComponentProps<'div'> & PropsWithChildren<Props>> = (props) => {
	const isMobile = useIsMobile()
	return (
		<div className="bg-muted pt-6">
			<div className={cn("container mx-auto px-3 lg:px-12 min-h-[calc(100vh-var(--header-height))]", props.className)}>
				<div className="grid lg:grid-cols-[auto_1fr] lg:gap-6 items-start">
					{isMobile ? <MobileMenu {...props} /> : <PcMenu {...props} />}
					<Card className="bg-background">
						<CardContent>
							{props.children}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}

function MobileMenu({ menus }: ComponentProps<'div'> & PropsWithChildren<Props>) {
	const menuClassName = useMemberClassName()
	return <div className='flex justify-between bg-background border-t px-3 fixed bottom-0 left-0 right-0'>
		{menus?.map((menu) => (
			<Link key={menu.to}
				to={menu.to}
				className={menuClassName.default}
				activeProps={{ className: menuClassName.active }}>
				<div className="flex flex-col items-center justify-center">
					{menu.icon && <menu.icon />}
					<div className={cn("text-xs")}>
						{menu.title}
					</div>
				</div>
			</Link>
		))}
	</div>
}

function PcMenu({ menus }: ComponentProps<'div'> & PropsWithChildren<Props>) {
	const { user } = useAuth()
	const menuClassName = useMemberClassName()
	return <section className='hidden lg:block'>
		<Card className='pt-0'>
			<div className="w-72">
				<UserIcon user={user!} className='w-72 object-cover h-72 rounded-b-none' />
			</div>
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
			{menus?.map((menu) => (
				<Link key={menu.to}
					to={menu.to}
					className={menuClassName.default}
					activeProps={{ className: menuClassName.active }}>
					<div className="flex items-center gap-2">
						{menu?.icon && <menu.icon />}
						{menu.title}
					</div>
				</Link>
			))}
		</div>
	</section>
}
