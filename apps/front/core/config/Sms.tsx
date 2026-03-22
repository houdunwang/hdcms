import { Button } from "#/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useMutation } from "@tanstack/react-query"
import { type FC } from 'react'
import { toast } from "sonner"
import z from "zod"
import { hdCreateFormHook, useApi } from "../hooks"
export const Sms: FC<{ form: any }> = ({ form }) => {
	const api = useApi()
	const mutationTestSms = useMutation(api.sms.test.mutationOptions())
	const { useAppForm } = hdCreateFormHook()
	const smsForm = useAppForm({
		defaultValues: {
			mobile: '',
		},
		validators: {
			onSubmit: z.object({
				mobile: z.string().regex(/^1[3-9]\d{9}$/, '请输入正确手机号'),
			})
		},
		onSubmit: async ({ value: body }) => {
			try {
				await mutationTestSms.mutateAsync({ body })
				toast.success('测试短信发送成功')
			} catch (error) {
				toast.error('短信发送失败')
			}
		}
	})

	return (

		<Card>
			<CardHeader>
				<CardTitle>短信发送</CardTitle>
				<CardDescription>网站短信发送相关配置</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3">
				<smsForm.AppField name='mobile' children={field => <field.FieldInput label="测试手机号" />} />
				<Button onClick={(e) => {
					e.preventDefault()
					void smsForm.handleSubmit()
				}}>发送验证码短信</Button>
				{/* <form.AppField name="site_close" children={(field: any) => <field.FieldSwitch label="开启维护" />} />
				<form.AppField name="site_close_description" children={(field: any) => <field.FieldTextarea label="网站维护说明" />} />
				<form.AppForm>
					<form.FieldSubmitButton type="submit" label="保存提交" />
				</form.AppForm> */}
			</CardContent>
		</Card>
	)
}