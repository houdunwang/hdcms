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
import { BookOpen, CalendarCheck, ShieldCheck, Sparkles, UserPlus } from 'lucide-react'
import z from "zod"
import { Footer } from "./Footer"
import { Layout } from "./Layout"

type LoginType = React.ComponentProps<"div">
export const Register = () => {
	return <Layout introduce={<Introduce />}>
		<RegisterComponent />
	</Layout>
}

function RegisterComponent({ className, onSubmit, ...props }: LoginType) {
	const { api } = useApi()
	const { login } = useAuth()
	const mutation = useMutation(
		api.auth.register.mutationOptions({
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
			name: '',
			password: '',
			password_confirmation: '',
			captcha: '',
		},
		validators: {
			onSubmit: z.object({
				name: z.string().regex(/^[a-zA-Z0-9_]{3,20}$/, '帐号只能包含字母、数字和下划线,长度为3-20位'),
				password: z.string().min(5, '密码不能少于5位'),
				password_confirmation: z.string().min(5, '确认密码不能少于5位'),
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
			<Card className={cn("flex flex-col gap-6", className)} {...props}>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<UserPlus /> 马上注册
					</CardTitle>
					<CardDescription>填写以下信息以注册新帐号</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">
					<form.AppField name="name" children={field => <field.FieldInput label="帐号" />} />
					<form.AppField name="password" children={field => <field.FieldInput label="密码" type="password" />} />
					<form.AppField name="password_confirmation" children={field => <field.FieldInput label="确认密码" type="password" />} />
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

function Introduce() {
	return <Card className="">
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
}
