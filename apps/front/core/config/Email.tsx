import { Button } from "#/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useMutation } from "@tanstack/react-query"
import { type FC } from 'react'
import { hdCreateFormHook, useApi } from "../hooks"
import { toast } from "sonner"
import z from "zod"
export const Email: FC<{ form: any }> = ({ form }) => {
	const api = useApi()
	const mutationTestEmail = useMutation(api.emails.test.mutationOptions())
	const { useAppForm } = hdCreateFormHook()
	const emailForm = useAppForm({
		defaultValues: {
			email: '',
		},
		validators: {
			onSubmit: z.object({
				email: z.email('请输入正确的邮箱格式'),
			})
		},
		onSubmit: async ({ value: body }) => {
			try {
				await mutationTestEmail.mutateAsync({ body })
				toast.success('测试邮件发送成功')
			} catch (error) {
				toast.error('邮件发送失败')
			}
		}
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>邮件发送</CardTitle>
				<CardDescription>网站邮件发送相关配置</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3">
				<emailForm.AppField name='email' children={field => <field.FieldInput label="测试邮箱" />} />
				<Button onClick={(e) => {
					e.preventDefault()
					void emailForm.handleSubmit()
				}}>发送测试邮件</Button>
				{/* <form.AppField name="site_close" children={(field: any) => <field.FieldSwitch label="开启维护" />} />
				<form.AppField name="site_close_description" children={(field: any) => <field.FieldTextarea label="网站维护说明" />} />
				<form.AppForm>
					<form.FieldSubmitButton type="submit" label="保存提交" />
				</form.AppForm> */}
			</CardContent>
		</Card>
	)
}