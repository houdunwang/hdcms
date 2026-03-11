import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { useAuth } from '@/hooks/useAuth'
import '@/plugin/dayjs'
import { ModeToggle } from '@/theme/mode-toggle'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { LaptopMinimalCheck, LogOut, Settings, SquareUserRound } from 'lucide-react'
import * as config from '@hdcms/config'

export const UserDropdown = (): React.JSX.Element => {
	const { isAuthenticated, isAdmin } = useAuth()
	return (
		<div className="flex gap-3 items-center">
			<div className="flex items-center gap-1">
				<ModeToggle />
				{isAdmin() && <a href="/admin" target="_blank">
					<Button variant="outline" size="sm">
						<Settings />
					</Button>
				</a>
				}
			</div>
			{isAuthenticated() ? <LoginComponent /> : <UnLogin />}
		</div>
	)
}

function LoginComponent() {
	const { user, logout } = useAuth()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className='cursor-pointer'>
				<Avatar>
					<AvatarImage src={user?.avatar!} className='rounded-sm' />
					<AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-auto'>
				<DropdownMenuGroup>
					<DropdownMenuItem>{user?.nickname || user?.name}</DropdownMenuItem>
					<DropdownMenuItem className='opacity-50 text-xs'>
						UID:{user?.id} /  注册于 {dayjs(user?.createdAt).fromNow()}
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuLabel>会员中心</DropdownMenuLabel>
					<Link to='/member' search={{ system: 'profile' }}>
						<DropdownMenuItem className='cursor-pointer py-2'>
							<SquareUserRound /> 资料管理
						</DropdownMenuItem>
					</Link>
					<Link to='/member' search={{ system: 'bind' }}>
						<DropdownMenuItem className='cursor-pointer py-2'>
							<LaptopMinimalCheck />帐号绑定
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					{config.menu.user?.label && <DropdownMenuSeparator />}
					{config.menu.user?.label && <DropdownMenuLabel>{config.menu.user?.label}</DropdownMenuLabel>}
					{config.menu.user?.items?.map((item) => (
						<Link key={item.to} to={item.to} target={item.target || '_self'}>
							<DropdownMenuItem className='cursor-pointer py-2'>
								{item.icon}{item.title}
							</DropdownMenuItem>
						</Link>
					))}
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem className='cursor-pointer py-2 ' onClick={() => logout()}>
						<LogOut />退出登录
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function UnLogin() {
	return <>
		<Link to="/auth?action=login" className="flex items-center gap-1">
			<Button variant={'default'}>登录</Button>
		</Link>
		<Link to="/auth?action=register" className="flex items-center gap-1">
			<Button variant={'outline'}>注册</Button>
		</Link>
	</>
}
