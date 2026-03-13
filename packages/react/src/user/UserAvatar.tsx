import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Data } from '@app/admin/data'
import { type JSX } from 'react'
type Props = {
	user: Data.User
}
export const UserAvatar = ({ user }: Props): JSX.Element => {
	return (
		<Avatar className='cursor-pointer hover:scale-125 duration-300'>
			<AvatarImage src={user.avatar || ''} />
			<AvatarFallback>{user.nickname}</AvatarFallback>
		</Avatar>
	)
}
