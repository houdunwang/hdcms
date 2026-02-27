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
import { useApi } from '@core/hooks/useApi'
import { useAuth } from '@core/hooks/useAuth'
import { userAtom } from '@core/store/userStore'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useAtomValue } from 'jotai'
import { ModeToggle } from '../theme/mode-toggle'
export const UserDropdown = () => {
	const { isLogin } = useAuth()
	return (
		<div className="flex gap-2 items-center">
			<ModeToggle />
			{isLogin ? <IsLoginComponent /> : <UnLogin />}
		</div>
	)
}

function IsLoginComponent() {
	const user = useAtomValue(userAtom)
	const { api } = useApi()
	const auth = useAuth()
	// const { data, isLoading } = useQuery(
	// 	api.users.me.queryOptions({}, {})
	// )

	return <>
		{/* {JSON.stringify(user?.$attributes)} */}
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar>
					<AvatarImage src={user?.avatar || ''} className='rounded-sm' />
					<AvatarFallback>{user?.name}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-auto'>
				<DropdownMenuGroup>
					<DropdownMenuItem>{user?.nickname || user?.name}</DropdownMenuItem>
					<DropdownMenuItem className='opacity-50 text-xs'>UID:{user?.id} /  注册于 {dayjs(user!.createdAt).fromNow()}</DropdownMenuItem>
					<DropdownMenuSeparator />
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuLabel>会员中心</DropdownMenuLabel>
					<DropdownMenuItem>用户中心</DropdownMenuItem>
					<DropdownMenuItem>订阅状态</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => auth.logout()}>退出登录</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	</>
}

function UnLogin() {
	return <>
		<Link to="/login" className="flex items-center gap-1">
			<Button variant={'outline'}>登录</Button>
		</Link>
		<Button variant={'outline'}>注册</Button>
	</>
}
