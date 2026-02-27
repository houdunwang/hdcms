import { AccountLogin } from 'core/components/auth/AccountLogin'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import { BookOpen, CalendarCheck, ShieldCheck, Sparkles } from 'lucide-react'
export const Route = createFileRoute('/_auth/login')({
	component: Page
})

function Page() {
	return <Component>
		<AccountLogin />
	</Component>
}

function Component({ children }: { children: React.ReactNode }) {
	const highlights = [
		{
			title: '系统课程路径',
			description: '从基础到实战的学习路线，阶段目标清晰可追踪。',
			icon: BookOpen,
		},
		{
			title: '实战项目驱动',
			description: '围绕真实业务场景拆解任务，产出可展示作品集。',
			icon: Sparkles,
		},
		{
			title: '学习记录同步',
			description: '进度自动保存，多设备接力学习不中断。',
			icon: CalendarCheck,
		},
		{
			title: '知识点可复习',
			description: '视频 + 文档 + 练习搭配，随学随查更稳。',
			icon: ShieldCheck,
		},
	] as const

	return (
		<section className="container mx-auto mt-20">
			<div className="grid items-start content-center pb-16 gap-10 lg:grid-cols-[auto_1fr]">
				<Card className="order-2 lg:order-11">
					<CardContent className='space-y-6'>
						<Card size="sm" className="w-fit">
							<CardContent className="flex items-center gap-2 text-xs text-muted-foreground">
								<span className="size-2 rounded-full bg-primary" />
								今天开始，建立你的学习节奏
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
									让学习变成可落地的能力
								</CardTitle>
								<CardDescription className="max-w-xl text-sm sm:text-base">
									注册后即可获取系统课程、实战项目与学习资料，学习进度自动记录，更新提醒不再错过。
								</CardDescription>
							</CardHeader>
						</Card>
						<div className="grid gap-4 sm:grid-cols-2">
							{highlights.map((item) => (
								<Card key={item.title} size="sm">
									<CardContent className="flex items-start gap-3">
										<div className="mt-1 rounded-lg border bg-background/70 p-2 text-muted-foreground">
											<item.icon className="size-4" />
										</div>
										<div>
											<div className="text-sm font-medium">{item.title}</div>
											<p className="mt-1 text-xs text-muted-foreground">
												{item.description}
											</p>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
						<Card>
							<CardContent className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
								<div>
									<div className="text-lg font-semibold text-foreground">120+ 课程</div>
									<div className="text-xs">覆盖前后端核心方向</div>
								</div>
								<div>
									<div className="text-lg font-semibold text-foreground">45+ 项目</div>
									<div className="text-xs">从需求到部署全流程</div>
								</div>
								<div>
									<div className="text-lg font-semibold text-foreground">持续更新</div>
									<div className="text-xs">每周都有新内容上线</div>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
				<Card className="order-1 lg:order-2 lg:justify-self-end w-full lg:max-w-md mx-auto bg-muted">
					<CardContent>
						{children}
						<Card size="sm" className="mt-4">
							<CardContent className="text-xs text-muted-foreground">
								注册即可解锁系统课、实战项目与学习资料，加入后还能获得学习记录与更新提醒。
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	)
}
