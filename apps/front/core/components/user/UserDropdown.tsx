import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@core/hooks/useAuth'
import { userAtom } from '@core/store/userStore'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useAtomValue } from 'jotai'
import { ModeToggle } from '../theme/mode-toggle'
export const UserDropdown = () => {
	const { isAuthenticated } = useAuth()
	return (
		<div className="flex gap-2 items-center">
			<ModeToggle />
			{isAuthenticated ? <IsLoginComponent /> : <UnLogin />}
		</div>
	)
}

function IsLoginComponent() {
	const user = useAtomValue(userAtom)
	const auth = useAuth()
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
					<Link to='/member/profile'>
						<DropdownMenuItem className='cursor-pointer py-1'>资料管理</DropdownMenuItem>
					</Link>
					<Link to='/member/bind'>
						<DropdownMenuItem className='cursor-pointer py-1'>帐号绑定</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem className='cursor-pointer py-2 ' onClick={() => auth.logout()}>退出登录</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function UnLogin() {
	return <>
		<Link to="/auth/login" className="flex items-center gap-1">
			<Button variant={'outline'}>登录</Button>
		</Link>
		<Link to="/auth/register" className="flex items-center gap-1">
			<Button variant={'outline'}>注册</Button>
		</Link>
	</>
}
