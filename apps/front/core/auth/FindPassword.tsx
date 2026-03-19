import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { fieldContext, formContext } from "../form"
import { FieldCaptcha } from "../form/FieldCaptcha"
import { FieldInput } from "../form/FieldInput"
import { FieldSubmitButton } from "../form/FieldSubmitButton"
import { useApi } from "../hooks/useApi"
import { useAuth } from "../hooks/useAuth"
import { createFormHook } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { BookOpen, CalendarCheck, ShieldCheck, Sparkles } from 'lucide-react'
import { useState } from "react"
import z from "zod"
import { FieldCode } from "../form/FieldCode"
import type { AuthComponentProps } from "./types"

export function FindPassword(props: AuthComponentProps): React.JSX.Element {
	const api = useApi()
	const { login } = useAuth()
	const [codeType, setCodeType] = useState<'email' | 'mobile'>('email')
	const mutationOptions = {
		onSuccess: ({ data }: any) => {
			login(data)
		}
	}
	const mutationEmail = useMutation(api.findPasswords.email.mutationOptions(mutationOptions))
	const mutationMobile = useMutation(api.findPasswords.mobile.mutationOptions(mutationOptions))

	const { useAppForm } = createFormHook({
		fieldComponents: {
			FieldInput,
			FieldCaptcha,
			FieldCode,
		},
		formComponents: {
			FieldSubmitButton
		},
		fieldContext,
		formContext,
	})
	const form = useAppForm({
		defaultValues: {
			email: '',
			mobile: '',
			code: '',
			password: '',
			password_confirmation: '',
			captcha: '',
		},
		onSubmit: async ({ value: body }) => {
			if (codeType == 'email') {
				await mutationEmail.mutateAsync({ body })
			} else {
				await mutationMobile.mutateAsync({ body })
			}
		}
	})

	return (
		<form autoComplete="off" onSubmit={e => {
			e.preventDefault()
			void form.handleSubmit()
		}} >
			<Card className={cn("flex flex-col gap-6")} >
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<ShieldCheck />
						找回密码
					</CardTitle>
					<CardDescription>你可以使用邮箱、手机号、用户名登录</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">
					<Tabs defaultValue={codeType} className="w-[400px]">
						<TabsList>
							<TabsTrigger value="email" onClick={() => setCodeType('email')}>邮箱找回</TabsTrigger>
							<TabsTrigger value="mobile" onClick={() => setCodeType('mobile')}>手机号找回</TabsTrigger>
						</TabsList>
					</Tabs>
					<form.AppField name={'code'} children={field => <field.FieldCode type={codeType} />} />
					<form.AppField name="password"
						validators={{
							onChange: z.string().min(5, '密码不能少于5位'),
						}}
						children={field => <field.FieldInput label="密码" type="password" />} />
					<form.AppField
						name="password_confirmation"
						validators={{
							onChange: z.string().min(5, '密码确认不能少于5位').refine((val) => val === form.state.values.password, '两次输入密码不一致'),
						}}
						children={field => <field.FieldInput label="确认密码" type="password" />}
					/>
					<form.AppField name="captcha"
						validators={{
							onChange: z.string().min(1, '请输入验证码'),
						}}
						children={field => <field.FieldCaptcha />} />
					<form.AppForm>
						<form.FieldSubmitButton type="submit" label="登录" className="w-full" />
					</form.AppForm>
				</CardContent>
				<CardFooter className="flex justify-center">
					{props.children}
				</CardFooter>
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
export function FindPasswordRightSpace(): React.JSX.Element {
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
