import { cn } from "../components/lib/utils"
import { app } from "@hdcms/config/app"

type Props = {
	className?: string
}
export const Footer = ({ className }: Props): React.JSX.Element => {
	return (
		<footer className={cn("border-t bg-muted/20", className)}>
			<div className="container mx-auto px-6">
				<div className="mx-auto max-w-6xl py-10">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
						<div className="flex items-center gap-2 text-sm font-medium">
							{app.logo}
							<span>{app.appName}</span>
						</div>
						<nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground"></nav>
					</div>
					<p className="mt-2 text-sm text-muted-foreground">
						{app.description}
						{/* 订阅会员：解锁系统课程、实战项目与配套资料，学习记录随时可追踪。 */}
					</p>
					<div className="mt-6 flex flex-col gap-2 border-t pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
						<div>© {new Date().getFullYear()} {app.appName} · {app.appUrl}</div>
						<div className="flex flex-col justify-end items-end">
							{app.copyright}
							<a
								href="https://beian.miit.gov.cn/"
								target='_blank'
								rel='noreferrer'
								className="underline-offset-4 hover:text-foreground hover:underline"
							>
								{app.icp}
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
