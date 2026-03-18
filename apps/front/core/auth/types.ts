import type { ReactNode } from "react"

export interface AuthProps {
	className?: string,
	showWechatLoginButton?: boolean
	wechatLoginButton?: ReactNode
	footerComponent?: ReactNode
	helperComponent?: ReactNode
	components?: {
		login?: {
			title?: string,
			description?: string,
			rightSpace?: ReactNode,
		},
		register?: {
			title?: string,
			description?: string,
			rightSpace?: ReactNode,
		},
		findPassword?: {
			title?: string,
			description?: string,
			rightSpace?: ReactNode,
		},
		wechatLogin?: {
			title?: string,
			description?: string,
			rightSpace?: ReactNode,
		},
	}
}

export interface AuthComponentProps {
	title?: string
	description?: string
	children: ReactNode,
}