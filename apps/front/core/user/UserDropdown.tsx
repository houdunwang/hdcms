import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { useAuth } from '#core/hooks/useAuth'
import '#core/plugin/dayjs'
import { ModeToggle } from '#core/theme/mode-toggle'
import { menu } from '@/config/menu'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { LogOut, Settings } from 'lucide-react'

export const UserDropdown = (): React.JSX.Element => {
	const { isAuthenticated, isAdmin } = useAuth()
	return (
		<div className="flex gap-3 items-center">
			<div className="flex items-center gap-1">
				<ModeToggle />
				{isAdmin && <Link to="/admin">
					<Button variant="outline" size="sm">
						<Settings />
					</Button>
				</Link>
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
				<DropdownMenuGroup>
					{menu.user.map(item => (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuLabel>{item.label}</DropdownMenuLabel>
							{item.items.map(menu => (
								<Link key={menu.to} to={menu.to} target={'target' in menu ? menu.target : '_self'}>
									<DropdownMenuItem className='cursor-pointer py-2'>
										{menu.icon}{menu.title}
									</DropdownMenuItem>
								</Link>
							))}
						</>
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
		<a href="/auth?action=login" className="flex items-center gap-1">
			<Button variant={'default'}>登录</Button>
		</a>
		<a href="/auth?action=register" className="flex items-center gap-1">
			<Button variant={'outline'}>注册</Button>
		</a>
	</>
}
