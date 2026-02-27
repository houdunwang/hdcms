import { FieldInput } from "core/components/form/FieldInput"
import { FieldSubscribeButton } from "core/components/form/FieldSubscribeButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import { useApi } from "@core/hooks/useApi"
import { cn } from "@/lib/utils"
import { fieldContext, formContext } from "@/routes/__root"
import { createFormHook } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import z from "zod"
import { FieldCaptcha } from "../form/FieldCaptcha"

type LoginType = React.ComponentProps<"div">

export function AccountLogin({ className, onSubmit, ...props }: LoginType) {
	const { api } = useApi()
	const mutation = useMutation(
		api.auth.login.mutationOptions({
			onSuccess: (data) => {
				data.data.user

			}
		})
		// mutationFn: async (data: { account: string; password: string; }) => {
		// 	return api.post<{ token: { token: string } }>("/core/login", data)
		// },
		// onSuccess: (data) => {
		// 	localStorage.setItem("token", data.token.token)
		// }
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
				password: z.string().min(5, '密码不能少于6位'),
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
					<CardTitle>登录你的账号</CardTitle>
					<CardDescription>你可以使用邮箱、手机号、用户名登录</CardDescription>
				</CardHeader>
				<CardContent>
					<FieldGroup>
						<form.AppField name="account" children={field => <field.FieldInput label="帐号" />} />
						<form.AppField name="password" children={field => <field.FieldInput label="密码" type="password" />} />
						<form.AppField name="captcha" children={field => <field.FieldCaptcha label="验证码" />} />

						<Field>
							<form.AppForm>
								<form.FieldSubscribeButton type="submit" label="登录" />
							</form.AppForm>
							<Button variant="outline" type="button">
								使用 微信 登录
							</Button>
							<FieldDescription className="text-center">
								没有账号? <a href="#">注册</a>
							</FieldDescription>
						</Field>
					</FieldGroup>
				</CardContent>
			</Card>
		</form>
	)
}
