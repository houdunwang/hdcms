import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Forget } from '@core/components/login/Forget'
import { createFileRoute } from '@tanstack/react-router'
import { BookOpen, CalendarCheck, ShieldCheck, Sparkles } from 'lucide-react'
export const Route = createFileRoute('/auth/forget')({
	component: Page
})

function Page() {
	return <Forget />;
	return <Component>
		<Forget />
	</Component>
}

function Component({ children }: { children: React.ReactNode }) {
	const highlights = [
		{
			title: '支持多方式找回',
			description: '邮箱 / 手机号 / 用户名均可发起找回。',
			icon: BookOpen,
		},
		{
			title: '安全重置',
			description: '流程可控，保障你的账号安全。',
			icon: ShieldCheck,
		},
	] as const

	return (
		<section className="container mx-auto mt-20">
			<div className="grid items-start content-center pb-16 gap-10 lg:grid-cols-[auto_1fr]">
				<Card className="lg:justify-self-end w-full lg:min-w-md mx-auto bg-muted">
					<CardContent>
						<Card size="sm" className="mb-4 w-fit">
							<CardContent className="flex items-center gap-2 text-xs text-muted-foreground">
								<span className="size-2 rounded-full bg-primary" />
								快速找回，2 分钟完成
							</CardContent>
						</Card>
						{children}
					</CardContent>
				</Card>
				<Card>
					<CardContent className='space-y-6'>
						<Card size="sm" className="w-fit">
							<CardContent className="flex items-center gap-2 text-xs text-muted-foreground">
								<span className="size-2 rounded-full bg-primary" />
								账号安全与找回支持
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
									找回密码，快速恢复账号访问
								</CardTitle>
								<CardDescription className="max-w-xl text-sm sm:text-base">
									通过验证码安全重置密码，支持邮箱/手机号/用户名。完成后即可正常登录。
								</CardDescription>
							</CardHeader>
						</Card>
						<div className="grid gap-4 sm:grid-cols-1">
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
							<CardHeader>
								<CardTitle className="text-2xl font-semibold">下一步指引</CardTitle>
								<CardDescription>完成找回后，你可以快速继续。</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-4 sm:grid-cols-3">
								<Card size='sm'>
									<CardContent className="flex items-start gap-3">
										<div className="mt-1 rounded-lg border bg-background/70 p-2 text-muted-foreground">
											<CalendarCheck className="size-4" />
										</div>
										<div>
											<div className="text-sm font-medium">回到登录</div>
											<p className="mt-1 text-xs text-muted-foreground">重置完成即可正常使用。</p>
										</div>
									</CardContent>
								</Card>
								<Card size='sm'>
									<CardContent className="flex items-start gap-3">
										<div className="mt-1 rounded-lg border bg-background/70 p-2 text-muted-foreground">
											<BookOpen className='size-4' />
										</div>
										<div>
											<div className="text-sm font-medium">浏览课程</div>
											<p className="mt-1 text-xs text-muted-foreground">循序渐进进入学习节奏。</p>
										</div>
									</CardContent>
								</Card>
								<Card size='sm'>
									<CardContent className="flex items-start gap-3">
										<div className="mt-1 rounded-lg border bg-background/70 p-2 text-muted-foreground">
											<Sparkles className='size-4' />
										</div>
										<div>
											<div className="text-sm font-medium">查看项目</div>
											<p className="mt-1 text-xs text-muted-foreground">做中学，产出可展示成果。</p>
										</div>
									</CardContent>
								</Card>
							</CardContent>
						</Card>

					</CardContent>
				</Card>

			</div>
		</section>
	)
}
