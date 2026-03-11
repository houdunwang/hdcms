import type { LucideIcon } from "lucide-react";
import { registry } from '@app/admin/registry'

// 链接项
export type ILinkItem<T extends object = {}> = T & {
	title: string
	to: string
	icon?: LucideIcon
	target?: '_blank' | '_self'
}

// 头像下拉菜单
export type IUserDropdownMenus = {
	label?: string,
	items: Array<ILinkItem>
}

// 用户模型
export type IUser = NonNullable<typeof registry.$tree.users.profile.types.response>['data']

// 路由context上下文
export type RouterContextConfig = {
	title?: string
}