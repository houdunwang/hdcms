export interface LayoutProps {
	className?: string,
	introduce?: React.ReactNode,
	description?: React.ReactNode,
	children: React.ReactNode,
}

export interface LoginProps {
	className?: string,
	footer?: React.ReactNode,
	showWechatLoginButton?: boolean,
}