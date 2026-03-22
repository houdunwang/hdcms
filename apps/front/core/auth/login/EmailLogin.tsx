import { hdCreateFormHook } from '#core/form/hdCreateFormHook.ts'
import { useApi } from '#core/hooks/useApi'
import { useAuth } from '#core/hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import { type ComponentProps, type FC } from 'react'
import { toast } from 'sonner'
import z from 'zod'

export const EmailLogin: FC<ComponentProps<'div'>> = () => {
	const api = useApi()
	const { login } = useAuth()
	const mutation = useMutation(
		api.login.email.mutationOptions()
	)
	const { useAppForm } = hdCreateFormHook()
	const form = useAppForm({
		defaultValues: {
			email: '',
			password: '',
			captcha: '',
		},
		validators: {
			onSubmit: z.object({
				password: z.string({ error: () => ({ message: '请输入密码' }) }).min(5, '密码不能少于 5 位'),
				captcha: z.string({ error: () => ({ message: '请输入验证码' }) }),
				email: z.email('请输入正确的邮箱格式'),
			}),
		},
		onSubmit: async ({ value: body }) => {
			try {
				const { data } = await mutation.mutateAsync({ body })
				login(data.user)
			} catch {
				toast.error('登录失败')
			}
		}
	})

	return (
		<form
			autoComplete="off"
			onSubmit={(e) => {
				e.preventDefault()
				void form.handleSubmit()
			}}
		>
			<div className="space-y-2 flex-1">
				<form.AppField name="email" children={(field) => <field.FieldInput label="邮箱" />} />
				<form.AppField
					name="password"
					children={(field) => <field.FieldInput label="密码" type="password" />}
				/>
				<form.AppField
					name="captcha"
					children={(field) => <field.FieldCaptcha label="验证码" />}
				/>
				<form.AppForm>
					<form.FieldSubmitButton type="submit" label="登录" buttonClassName="w-full" />
				</form.AppForm>
			</div>
		</form>
	)
}


