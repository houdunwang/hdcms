import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuth } from '@core/hooks/useAuth'
import React from 'react'
import { BookOpen, CalendarCheck, ShieldCheck, Sparkles, RefreshCw, Clock } from 'lucide-react'

const highlights = [
	{
		title: '体系化学习路径',
		description: '从基础入门到高阶实战，循序渐进的完整学习路径，让成长有迹可循。',
		icon: BookOpen,
	},
	{
		title: '企业级项目实战',
		description: '基于真实业务场景深度拆解，打造高含金量作品集，助力职场进阶。',
		icon: Sparkles,
	},
	{
		title: '云端同步进度',
		description: '多端进度实时云同步，随时随地无缝衔接学习状态，利用碎片时间高效成长。',
		icon: CalendarCheck,
	},
	{
		title: '多维学习闭环',
		description: '视频精讲、图文文档与实战练习深度结合，构建全方位知识体系。',
		icon: ShieldCheck,
	},
] as const

export const Route = createFileRoute('/_auth/wechat')({
	component: Page,
})

function Page() {
	return <Component>
		<WechatLogin />
	</Component>
}

function Component({ children }: { children: React.ReactNode }) {
	return (
		<section className="container mx-auto mt-20">
			<div className="grid items-start content-center pb-16 gap-10 lg:grid-cols-[auto_1fr]">
				<Card className="order-2 lg:order-11">
					<CardContent className='space-y-6'>
						<Card size="sm" className="w-fit">
							<CardContent className="flex items-center gap-2 text-xs text-muted-foreground">
								<span className="size-2 rounded-full bg-primary" />
								网站亮点
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
									微信扫码，一键开启学习之旅
								</CardTitle>
								<CardDescription className="max-w-xl text-sm sm:text-base">
									登录即可畅享全栈课程体系、企业级实战项目与专属学习资料。自动同步学习轨迹，不错过每一次技术更新。
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
									<div className="text-lg font-semibold text-foreground">120+ 精品课程</div>
									<div className="text-xs">涵盖前端、后端及架构核心领域</div>
								</div>
								<div>
									<div className="text-lg font-semibold text-foreground">45+ 实战案例</div>
									<div className="text-xs">还原从需求分析到上线部署全流程</div>
								</div>
								<div>
									<div className="text-lg font-semibold text-foreground">内容持续迭代</div>
									<div className="text-xs">紧跟技术前沿，每周持续更新</div>
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
								扫码登录更安全便捷，授权完成后自动进入并同步学习记录。
							</CardContent>
						</Card>
						<div className="mt-2 text-xs text-muted-foreground">
							或者前往<Link to="/login" className="ml-1 text-primary hover:underline">账号密码登录</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	)
}

function WechatLogin() {
	const { login } = useAuth()
	const [qr, setQr] = React.useState<{ ticket: string, expire_seconds: number, url: string } | null>(null)
	const [leftSeconds, setLeftSeconds] = React.useState<number>(0)
	const [status, setStatus] = React.useState<'loading' | 'waiting' | 'expired'>('loading')
	const [refreshing, setRefreshing] = React.useState(false)

	const initQr = React.useCallback(async () => {
		setRefreshing(true)
		setStatus('loading')
		await fetch(`${import.meta.env.VITE_API_URL}/core/wechat/login/qr`, {
			method: 'POST',
			headers: { Accept: 'application/json' }
		})
			.then(async (res) => res.json())
			.then((data) => {
				setQr(data as { ticket: string, expire_seconds: number, url: string })
				setLeftSeconds((data as any)?.expire_seconds ?? 0)
				setStatus('waiting')
			})
			.finally(() => setRefreshing(false))
	}, [])

	React.useEffect(() => {
		void initQr()
	}, [initQr])

	React.useEffect(() => {
		if (status !== 'waiting') return
		const timer = setInterval(() => {
			setLeftSeconds(s => {
				const next = s - 1
				if (next <= 0) {
					clearInterval(timer)
					setStatus('expired')
					return 0
				}
				return next
			})
		}, 1000)
		return () => clearInterval(timer)
	}, [status])

	React.useEffect(() => {
		if (!qr || status !== 'waiting') return
		const polling = setInterval(async () => {
			await fetch(`${import.meta.env.VITE_API_URL}/core/wechat/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({ ticket: qr.ticket })
			})
				.then(async (res) => res.json())
				.then((data: any) => {
					if (data?.token) {
						login(data)
						clearInterval(polling)
					}
				})
				.catch(() => { })
		}, 2000)
		return () => clearInterval(polling)
	}, [qr, status, login])

	return (
		<Card>
			<CardHeader>
				<CardTitle>微信扫码安全登录</CardTitle>
				<CardDescription>打开手机微信扫描二维码，一键授权快速登录</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex flex-col items-center gap-3">
					<div className="rounded-lg bg-background p-3 border">
						{qr?.url ? (
							<img src={qr.url} alt="微信扫码登录二维码" className="w-56 h-56 object-contain" />
						) : (
							<div className="w-56 h-56 flex items-center justify-center text-muted-foreground">加载中</div>
						)}
					</div>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Clock className="size-4" />
						{status === 'waiting' ? `二维码将在 ${leftSeconds}s 后过期` : '二维码已过期，请刷新'}
					</div>
					<Button type="button" variant="outline" size="lg" onClick={() => void initQr()} disabled={refreshing}>
						<RefreshCw className="size-4 mr-2" />
						刷新二维码
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
