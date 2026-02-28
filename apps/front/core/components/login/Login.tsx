import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { FieldCaptcha } from "@core/components/form/FieldCaptcha"
import { FieldInput } from "@core/components/form/FieldInput"
import { fieldContext, formContext } from "@core/hd"
import { useApi } from "@core/hooks/useApi"
import { useAuth } from "@core/hooks/useAuth"
import { createFormHook } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { FieldSubscribeButton } from "core/components/form/FieldSubscribeButton"
import { BookOpen, CalendarCheck, ShieldCheck, Sparkles, User } from 'lucide-react'
import z from "zod"
import { Footer } from "./Footer"
import { Layout } from "./Layout"

export const Login = () => {
	return <Layout introduce={<Introduce />}>
		<LoginComponent />
	</Layout>
}

export function LoginComponent() {
	const { api } = useApi()
	const { login } = useAuth()
	const mutation = useMutation(
		api.auth.login.mutationOptions({
			onSuccess: ({ data }) => {
				login(data)
			}
		})
	)

	const { useAppForm } = createFormHook({
		fieldComponents: {
			FieldInput,
			FieldCaptcha
		},
		formComponents: {
			FieldSubscribeButton
		},
		fieldContext,
		formContext,
	})
	const form = useAppForm({
		defaultValues: {
			captcha: '',
			account: '',
			password: '',
		},
		validators: {
			onSubmit: z.object({
				account: z.string().min(1, '请输入邮箱、手机号、用户名'),
				password: z.string().min(5, '密码不能少于5位'),
				captcha: z.string().min(1, '请输入验证码'),
			}),
		},
		onSubmit: ({ value: body }) => {
			mutation.mutate({ body })
		}
	})

	return (
		<form autoComplete="off" onSubmit={e => {
			e.preventDefault()
			void form.handleSubmit()
		}} >
			<Card className={cn("flex flex-col gap-6")}>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<User className="w-5 h-5" />
						登录你的账号
					</CardTitle>
					<CardDescription>你可以使用邮箱、手机号、用户名登录</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">
					<form.AppField name="account" children={field => <field.FieldInput label="帐号" />} />
					<form.AppField name="password" children={field => <field.FieldInput label="密码" type="password" />} />
					<form.AppField name="captcha" children={field => <field.FieldCaptcha label="验证码" />} />
					<form.AppForm>
						<form.FieldSubscribeButton type="submit" label="登录" />
					</form.AppForm>
					<Footer />
				</CardContent>
			</Card>
		</form>
	)
}


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

function Introduce() {
	return <Card>
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
}