import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Data } from '@app/admin/data'
import { User } from 'lucide-react'
import { type JSX } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import dayjs from 'dayjs'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
type Props = {
	user: Data.User
}
export const UserAvatar = ({ user }: Props): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger>
				<Avatar className='cursor-pointer hover:scale-125 duration-300'>
					<AvatarImage src={user.avatar || ''} />
					<AvatarFallback><User /></AvatarFallback>
				</Avatar>
			</DialogTrigger>
			<DialogContent className='lg:min-w-lg overflow-y-auto max-h-screen'>
				<DialogHeader>
					<DialogTitle>用户资料</DialogTitle>
					<DialogDescription>
						{/* 创建时间: {dayjs(user.createdAt).format('YYYY-MM-DD HH:mm')} <br />
						最近登录时间: {dayjs(user.updatedAt).format('YYYY-MM-DD HH:mm')} */}
					</DialogDescription>
				</DialogHeader>
				{user.id && (
					<Field>
						<FieldLabel> 用户ID	</FieldLabel>
						<Input defaultValue={user.id || ''} />
					</Field>
				)}
				<Field>
					<FieldLabel> 用户名	</FieldLabel>
					<Input defaultValue={user.name || ''} />
				</Field>
				<Field>
					<FieldLabel> 昵称	</FieldLabel>
					<Input defaultValue={user.nickname || ''} />
				</Field>
				<Field>
					<FieldLabel> 邮箱	</FieldLabel>
					<Input defaultValue={user.email || ''} />
				</Field>
				{user.mobile && (
					<Field>
						<FieldLabel> 手机号	</FieldLabel>
						<Input defaultValue={user.mobile || ''} />
					</Field>
				)}
				{user.realName && (
					<Field>
						<FieldLabel> 真实姓名	</FieldLabel>
						<Input defaultValue={user.realName || ''} />
					</Field>
				)}
				{user.wechat && (
					<Field>
						<FieldLabel> 微信号	</FieldLabel>
						<Input defaultValue={user.wechat || ''} />
					</Field>
				)}
				{user.updatedAt && (
					<Field>
						<FieldLabel> 最近登录时间	</FieldLabel>
						<Input defaultValue={dayjs(user.updatedAt).format('YYYY-MM-DD HH:mm')} />
					</Field>
				)}
				{user.createdAt && (
					<Field>
						<FieldLabel> 注册时间	</FieldLabel>
						<Input defaultValue={dayjs(user.createdAt).format('YYYY-MM-DD HH:mm')} />
					</Field>
				)}
			</DialogContent>
		</Dialog>

	)
}
