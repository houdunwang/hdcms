export const HdFooter = () => {
	return (
		<footer className="border-t bg-muted/20">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-6xl py-10">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
						<div className="flex items-center gap-2 text-sm font-medium">
							<div className="size-4 rounded-full bg-muted" />
							<span>后盾人</span>
						</div>

						<nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground"></nav>
					</div>

					<p className="mt-2 text-sm text-muted-foreground">
						订阅会员：解锁系统课程、实战项目与配套资料，学习记录随时可追踪。
					</p>

					<div className="mt-6 flex flex-col gap-2 border-t pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
						<div>© {new Date().getFullYear()} 后盾人 · houdunren.com</div>
						<a
							href="https://beian.miit.gov.cn/"
							target='_blank'
							rel='noreferrer'
							className="underline-offset-4 hover:text-foreground hover:underline"
						>
							Copyright © houdunren.com All Rights Reserved
							京ICP备12048441号-8
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}
