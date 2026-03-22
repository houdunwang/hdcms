import { useApi } from "#core/hooks/useApi"
import { useAuth } from "#core/hooks/useAuth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { UserPlus } from 'lucide-react'
import z from "zod"
import { hdCreateFormHook } from "#core/hooks"
import { AuthFooter } from "../AuthFooter"
import type { AuthComponentProps } from "#core/auth/types"
import { WechatLoginButton } from "#core/auth/WechatLoginButton"
import { RegisterRightSpace } from "./right"

export function Register(props: AuthComponentProps): React.JSX.Element {
	const api = useApi()
	const { login } = useAuth()
	const mutation = useMutation(
		api.auth.register.mutationOptions({
			onSuccess: ({ data }) => {
				login(data.user)
			}
		})
	)

	const { useAppForm } = hdCreateFormHook()
	const form = useAppForm({
		defaultValues: {
			name: '',
			password: '',
			password_confirmation: '',
			captcha: '',
		},
		validators: {
			onSubmit: z.object({
				name: z.string({ error: () => ({ message: "用户名不能为空" }) }).regex(/^[a-zA-Z0-9_]{3,20}$/, '帐号只能包含字母、数字和下划线,长度为3-20位'),
				password: z.string({ error: () => ({ message: "密码不能为空" }) }).min(5, '密码不能少于5位'),
				password_confirmation: z.string({ error: () => ({ message: "确认密码不能为空" }) }).min(5, '确认密码不能少于5位'),
				captcha: z.string({ error: () => ({ message: "验证码不能为空" }) }).min(1, '请输入验证码'),
			}).refine((data) => data.password === data.password_confirmation, {
				message: "两次输入的密码不一致",
				path: ["password_confirmation"],
			})
		},
		onSubmit: async ({ value: body }) => {
			await mutation.mutateAsync({ body })
		}
	})

	return (
		<form autoComplete="off" onSubmit={e => {
			e.preventDefault()
			void form.handleSubmit()
		}} >
			<div className="grid xl:grid-cols-[400px_1fr] gap-6 w-full">
				<Card className={cn("flex flex-col gap-6")}>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<UserPlus /> 马上注册
						</CardTitle>
						<CardDescription>填写以下信息以注册新帐号</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<form.AppField name="name"
							children={field => <field.FieldInput label="用户名" />} />
						<form.AppField name="password"
							children={field => <field.FieldInput label="密码" type="password" />} />
						<form.AppField name="password_confirmation"
							children={field => <field.FieldInput label="确认密码" type="password" />} />
						<form.AppField name="captcha"
							children={field => <field.FieldCaptcha label="验证码" />} />
						<form.AppForm>
							<form.FieldSubmitButton type="submit" label="注册" buttonClassName="w-full" />
						</form.AppForm>
						<WechatLoginButton />
					</CardContent>
					<CardFooter className="flex flex-col justify-center items-center space-y-3">
						<AuthFooter />
					</CardFooter>
				</Card>
				{props.children || <RegisterRightSpace />}
			</div>
		</form>
	)
}
