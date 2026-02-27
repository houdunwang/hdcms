import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Register } from '@core/components/auth/Register'
import { createFileRoute } from '@tanstack/react-router'
import { BookOpen, CalendarCheck, ShieldCheck, Sparkles } from 'lucide-react'
export const Route = createFileRoute('/_auth/register')({
	component: Page
})

function Page() {
	return <Component>
		<Register />
	</Component>
}

function Component({ children }: { children: React.ReactNode }) {
	const highlights = [
		{
			title: '零基础友好',
			description: '循序渐进的学习路线与新手引导，快速进入状态。',
			icon: BookOpen,
		},
		{
			title: '项目驱动学习',
			description: '围绕真实业务场景拆解任务，边做边学产出成果。',
			icon: Sparkles,
		},
		{
			title: '进度与提醒',
			description: '学习进度自动保存，多端同步，更新及时提醒。',
			icon: CalendarCheck,
		},
		{
			title: '可复习与巩固',
			description: '视频、文档、练习组合，知识点随查随练更扎实。',
			icon: ShieldCheck,
		},
	] as const

	return (
		<section className="container mx-auto mt-20">
			<div className="grid items-start content-center pb-16 gap-10 lg:grid-cols-[auto_1fr]">
				<Card className="order-2 lg:order-3">
					<CardContent className='space-y-6'>
						<Card size="sm" className="w-fit">
							<CardContent className="flex items-center gap-2 text-xs text-muted-foreground">
								<span className="size-2 rounded-full bg-primary" />
								面向新手与转行者的工程师成长体系
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
									立即加入，系统化成长为工程师
								</CardTitle>
								<CardDescription className="max-w-xl text-sm sm:text-base">
									注册后解锁完整学习路径、真实项目与资料库。进度自动记录，多端同步，更新提醒助你坚持不掉队。
								</CardDescription>
							</CardHeader>
						</Card>
						<div className="grid gap-4 sm:grid-cols-2">
							{highlights.map((item) => (
								<Card key={item.title} size="sm">
									<CardContent className="flex items-start gap-3">
										<div className="mt-1 rounded-lg border bg-background/70 p-2 text-muted-foreground">
											<item.icon className='size-4' />
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
									<div className="text-xs">持续发布新课程与项目</div>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
				<Card className="order-1 lg:order-2 lg:justify-self-end w-full lg:max-w-md mx-auto bg-muted">
					<CardContent>
						<Card size="sm" className="mb-4 w-fit">
							<CardContent className="flex items-center gap-2 text-xs text-muted-foreground">
								<span className="size-2 rounded-full bg-primary" />
								免费注册，2 分钟上手
							</CardContent>
						</Card>
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
