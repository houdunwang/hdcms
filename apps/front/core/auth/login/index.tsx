import type { AuthComponentProps } from '#core/auth/types'
import { WechatLoginButton } from '#core/auth/WechatLoginButton'
import { hdCreateFormHook } from '#core/form/hdCreateFormHook.ts'
import { useApi } from '#core/hooks/useApi'
import { useAuth } from '#core/hooks/useAuth'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { registry } from '@app/admin/registry'
import { useMutation } from '@tanstack/react-query'
import { User } from 'lucide-react'
import { useMemo, useState, type FC, type PropsWithChildren } from 'react'
import z from 'zod'
import { AuthFooter } from '../AuthFooter'
import { LoginRightSpace } from './loginRight'
import { useSetAtom } from 'jotai'
import { fieldErrorAtom } from '#core/store/fieldErrorAtom.ts'
import { toast } from 'sonner'

type loginFieldType = 'name' | 'mobile' | 'email'
const baseSchema = {
	password: z.string({ error: () => ({ message: '请输入密码' }) }).min(5, '密码不能少于 5 位'),
	captcha: z.string({ error: () => ({ message: '请输入验证码' }) })
}

const schemaMap = {
	name: z.object({
		...baseSchema,
		name: z.string({ error: () => ({ message: '请输入帐号' }) }),
	}),
	email: z.object({
		...baseSchema,
		email: z.email('请输入正确的邮箱格式'),
	}),
	mobile: z.object({
		...baseSchema,
		mobile: z.string({ error: () => ({ message: '请输入手机号' }) }).regex(/^1[3-9]\d{9}$/, '请输入正确的手机号'),
	}),
}

export const Login: FC<PropsWithChildren<AuthComponentProps>> = (props) => {
	const [loginType, setLoginType] = useState<loginFieldType>('name')
	const setAtomFieldError = useSetAtom(fieldErrorAtom)
	const api = useApi()
	const { login } = useAuth()
	const mutation = useMutation(
		api.auth.login.mutationOptions({
			meta: {
				skipGlobalError: true,
			}
		})
	)
	const { useAppForm } = hdCreateFormHook()
	const currentSchema = useMemo(() => schemaMap[loginType], [loginType])
	const form = useAppForm({
		defaultValues: {} as typeof registry.$tree.auth.login.types.body,
		validators: {
			onSubmit: currentSchema,
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
	const tabChangeHandle = (v: string) => {
		const nextType = v as loginFieldType
		setAtomFieldError({})
		const fields = ['name', 'mobile', 'email', 'password', 'captcha'] as const
		fields.forEach((key) => {
			const value = form.getFieldValue(key)
			form.resetField(key)
			form.setFieldValue(key, value)
		})
		setLoginType(nextType)
	}
	return (
		<form
			autoComplete="off"
			onSubmit={(e) => {
				e.preventDefault()
				void form.handleSubmit()
			}}
		>
			<div className="grid xl:grid-cols-[400px_1fr] gap-6 w-full">
				<Card className={cn('flex flex-col gap-6')}>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<User className="w-5 h-5" />
							{props.title || '登录你的账号'}
						</CardTitle>
						<CardDescription>{props.description || '登录网站马上开始你的旅程'}</CardDescription>
						<div className="flex gap-2 mt-4">
							<Tabs
								defaultValue={loginType}
								onValueChange={tabChangeHandle}
							>
								<TabsList variant="default">
									<TabsTrigger value="name">帐号</TabsTrigger>
									<TabsTrigger value="mobile">手机号</TabsTrigger>
									<TabsTrigger value="email">邮箱</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>
					</CardHeader>
					<CardContent className="space-y-2 flex-1">
						{loginType === 'name' && (
							<form.AppField name="name" children={(field) => <field.FieldInput label="帐号" />} />
						)}
						{loginType === 'email' && (
							<form.AppField name="email" children={(field) => <field.FieldInput label="邮箱" />} />
						)}
						{loginType === 'mobile' && (
							<form.AppField
								name="mobile"
								children={(field) => <field.FieldInput type="tel" label="手机号" />}
							/>
						)}
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
						<WechatLoginButton />
					</CardContent>
					<CardFooter className="flex flex-col justify-center items-center space-y-3">
						<AuthFooter />
					</CardFooter>
				</Card>
				{props.children || <LoginRightSpace />}
			</div>
		</form>
	)
}
