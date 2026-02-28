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
import { BookOpen, CalendarCheck, ShieldCheck, Sparkles } from 'lucide-react'
import z from "zod"
import { FieldSendCode } from "../form/FieldSendCode"
import { Footer } from "./Footer"
import { Layout } from "./Layout"

type LoginType = React.ComponentProps<"div">
export const Forget = () => {
	return <Layout introduce={<Introduce />}>
		<ForgetComponent />
	</Layout>
}

function ForgetComponent({ className, onSubmit, ...props }: LoginType) {
	const { api } = useApi()
	const { login } = useAuth()
	const mutation = useMutation(
		api.auth.findPassword.mutationOptions({
			onSuccess: ({ data }) => {
				login(data)
			}
		})
	)

	const { useAppForm } = createFormHook({
		fieldComponents: {
			FieldInput,
			FieldCaptcha,
			FieldSendCode,
		},
		formComponents: {
			FieldSubscribeButton
		},
		fieldContext,
		formContext,
	})
	const form = useAppForm({
		defaultValues: {
			account: '2300071698@qq.com',
			code: 'admin',
			password: 'admin888',
			password_confirmation: 'admin888'
		},
		onSubmit: ({ value: body }) => {
			console.log('Forget submit body:', body)
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
						<ShieldCheck />
						找回密码
					</CardTitle>
					<CardDescription>你可以使用邮箱、手机号、用户名登录</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">
					<form.AppField name="code" validators={{ onChange: z.string().min(1, '请输入验证码') }} children={field => <field.FieldSendCode label="发送验证码" />} />
					<form.AppField name="password" validators={{ onChange: z.string().min(5, '密码不能少于5位') }} children={field => <field.FieldInput label="密码" type="password" />} />
					<form.AppField
						name="password_confirmation"
						validators={{
							onChange: z.string().min(5, '密码确认不能少于5位').refine((val) => val === form.getFieldValue('password'), "两次输入的密码不一致")
						}}
						children={field => <field.FieldInput label="确认密码" type="password" />}
					/>
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
function Introduce() {
	return <Card>
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
					<Card size="sm">
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
					<Card size="sm">
						<CardContent className="flex items-start gap-3">
							<div className="mt-1 rounded-lg border bg-background/70 p-2 text-muted-foreground">
								<BookOpen className="size-4" />
							</div>
							<div>
								<div className="text-sm font-medium">浏览课程</div>
								<p className="mt-1 text-xs text-muted-foreground">循序渐进进入学习节奏。</p>
							</div>
						</CardContent>
					</Card>
					<Card size="sm">
						<CardContent className="flex items-start gap-3">
							<div className="mt-1 rounded-lg border bg-background/70 p-2 text-muted-foreground">
								<Sparkles className="size-4" />
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
}
