import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type Props = {
	className?: string
	siteName?: string
	domain?: string
	description?: string
	icp?: string | ReactNode
	copyright?: string | ReactNode
	logo?: ReactNode | string
}
export const Footer = ({ className, siteName, domain, description, copyright, logo, icp }: Props): React.JSX.Element => {
	return (
		<footer className={cn("border-t bg-muted/20", className)}>
			<div className="container mx-auto px-6">
				<div className="mx-auto max-w-6xl py-10">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
						<div className="flex items-center gap-2 text-sm font-medium">
							{logo}
							<span>{siteName}</span>
						</div>
						<nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground"></nav>
					</div>
					<p className="mt-2 text-sm text-muted-foreground">
						{description || '订阅会员：解锁系统课程、实战项目与配套资料，学习记录随时可追踪。'}
						{/* 订阅会员：解锁系统课程、实战项目与配套资料，学习记录随时可追踪。 */}
					</p>
					<div className="mt-6 flex flex-col gap-2 border-t pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
						<div>© {new Date().getFullYear()} {siteName} · {domain}</div>
						<div className="flex flex-col justify-end items-end">
							{copyright}
							<a
								href="https://beian.miit.gov.cn/"
								target='_blank'
								rel='noreferrer'
								className="underline-offset-4 hover:text-foreground hover:underline"
							>
								{icp}
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
