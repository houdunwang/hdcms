import type { LucideIcon } from "lucide-react";

// 链接项
export type ILinkItem<T extends object = {}> = T & {
	title: string
	to: string
	icon?: LucideIcon
	target?: '_blank' | '_self'
}

// 路由context上下文
export type RouterContextConfig = {
	title?: string
}