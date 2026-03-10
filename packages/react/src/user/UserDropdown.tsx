import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import type { IUserDropdownMenus } from '@/index'
import { useAuth } from '@/hooks/useAuth'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { ModeToggle } from '../../src/theme/mode-toggle'
interface Props {
	menus?: IUserDropdownMenus
}
export const UserDropdown = ({ menus }: Props) => {
	const { isAuthenticated } = useAuth()
	return (
		<div className="flex gap-2 items-center">
			<ModeToggle />
			{isAuthenticated() ? <LoginComponent menus={menus} /> : <UnLogin />}
		</div>
	)
}

function LoginComponent({ menus }: Props) {
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
						<DropdownMenuItem className='cursor-pointer py-1'>资料管理</DropdownMenuItem>
					</Link>
					<Link to='/member' search={{ system: 'bind' }}>
						<DropdownMenuItem className='cursor-pointer py-1'>帐号绑定</DropdownMenuItem>
					</Link>

				</DropdownMenuGroup>
				<DropdownMenuGroup>
					{menus?.label && <DropdownMenuSeparator />}
					{menus?.label && <DropdownMenuLabel>{menus?.label}</DropdownMenuLabel>}
					{menus?.items.map((item) => (
						<Link key={item.to} to={item.to} >
							<DropdownMenuItem className='cursor-pointer py-1'>{item.title}</DropdownMenuItem>
						</Link>
					))}
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem className='cursor-pointer py-2 ' onClick={() => logout()}>退出登录</DropdownMenuItem>
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
