import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '#core/hooks'
import { useMutation } from '@tanstack/react-query'
import { BookOpen, CalendarCheck, ShieldCheck, Sparkles } from 'lucide-react'
import { useApi } from '#core/hooks/useApi'
import { WechatQrCode } from '#core/wechat/WechatQrCode'
import type { AuthComponentProps } from './types'


export function WechatLogin(props: AuthComponentProps): React.JSX.Element {
	const api = useApi()
	const auth = useAuth()
	const mutation = useMutation(api.wechatLogin.login.mutationOptions())
	return (
		<Card className={''}>
			<CardHeader>
				<CardTitle>微信扫码安全登录</CardTitle>
				<CardDescription>打开手机微信扫描二维码，一键授权快速登录</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<WechatQrCode
					scene_str='login'
					onSuccess={async (ticket: string): Promise<'success' | undefined> => {
						const res = await mutation.mutateAsync({ body: { ticket } })
						if (res.data.token) {
							auth.login(res.data)
							return 'success'
						}
					}} />
			</CardContent>
			<CardFooter className="flex justify-center">
				{props.children}
			</CardFooter>
		</Card>
	)
}

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

export function WechatRightSpace(): React.JSX.Element {
	return <Card className="order-2 lg:order-11">
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
}
