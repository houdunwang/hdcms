import type { ComponentType, JSX, ReactNode } from "react"


// 路由context上下文
export type RouterContextConfig = {
	title?: string
}

//菜单类型
export type MenuType = {
	title: string
	to: string
	icon: ComponentType
	target?: '_blank' | '_self'
}

// 头部和脚部配置
export type AppConfigType = {
	appName: string,
	appUrl: string,
	logo: ReactNode
	icp: string
	copyright: string
	description: string
}
