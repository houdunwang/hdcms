import type { LucideIcon } from "lucide-react";
import { registry } from '@app/admin/registry'
export type ILinkItem<T extends object = {}> = T & {
	title: string
	to: string
	icon?: LucideIcon
	target?: '_blank' | '_self'
}

export type IUserDropdownMenus = {
	label?: string,
	items: Array<ILinkItem>
}

export type IUser = NonNullable<typeof registry.$tree.users.profile.types.response>['data']


export type RouterContextConfig = {
	title?: string
	showHeader?: boolean
}