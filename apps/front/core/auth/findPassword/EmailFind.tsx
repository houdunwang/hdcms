import { hdCreateFormHook } from "#core/form/hdCreateFormHook.ts"
import { useApi } from "#core/hooks/useApi"
import { useAuth } from "#core/hooks/useAuth"
import { useMutation } from "@tanstack/react-query"
import { type ComponentProps, type FC } from "react"
import { toast } from 'sonner'
import z from "zod"

const { useAppForm } = hdCreateFormHook()

export const EmailFind: FC<ComponentProps<'div'>> = () => {
	const api = useApi()
	const { login } = useAuth()
	const mutation = useMutation(api.findPasswords.email.mutationOptions({
		onSuccess: ({ data }) => login(data.user)
	}))

	const form = useAppForm({
		defaultValues: {
			email: '',
			code: '',
			password: '',
			password_confirmation: '',
			captcha: '',
		},
		validators: {
			onSubmit: z.object({
				code: z.string({ error: () => ({ message: '验证码不能为空' }) }),
				password: z.string({ error: () => ({ message: "密码不能为空" }) }).min(5, '密码不能少于5位'),
				password_confirmation: z.string({ error: () => ({ message: '确定密码不能为空' }) }).min(5, '确认密码不能少于5位'),
				captcha: z.string({ error: () => ({ message: '输入右侧加法结果' }) }),
				email: z.email({ error: () => ({ message: '邮箱格式错误' }) })
			}).refine((data) => data.password === data.password_confirmation, {
				message: "两次输入的密码不一致",
				path: ["password_confirmation"],
			})
		},
		onSubmit: async ({ value: body }) => {
			try {
				await mutation.mutateAsync({ body })
				toast.success('找回密码成功')
			} catch {
				toast.error('找回密码失败')
			}
		}
	})


	return (
		<form autoComplete="off" onSubmit={e => {
			e.preventDefault()
			void form.handleSubmit()
		}} >
			<div className="space-y-2">
				<form.AppField name={'code'} children={fieldCtx => <fieldCtx.FieldCode type={'email'} />} />
				<form.AppField name="password"
					children={field => <field.FieldInput label="密码" type="password" />} />
				<form.AppField
					name="password_confirmation"
					children={field => <field.FieldInput label="确认密码" type="password" />}
				/>
				<form.AppField name="captcha" children={field => <field.FieldCaptcha />} />
				<form.AppForm>
					<form.FieldSubmitButton type="submit" label="找回密码" buttonClassName="w-full" />
				</form.AppForm>
			</div>
		</form>
	)
}
