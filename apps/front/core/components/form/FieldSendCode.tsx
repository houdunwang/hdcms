import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useFieldContext } from "@core/hd"
import { useField } from "@tanstack/react-form"
import type { FormFieldProps, IFieldApi } from "core/types/form"
import z from "zod"
import { FieldValidateError } from "./FieldValidateError"
import { useApi } from "@core/hooks/useApi"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useEffect, useState } from "react"

const accountValidator = z.string().min(1, '请输入手机号或邮箱')
	.refine(val => {
		return /^1[3-9]\d{9}$/.test(val) || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)
	}, '请输入正确的手机号或邮箱')

export function FieldSendCode({ label, description, className, fieldClassName, type, ...props }: FormFieldProps<'input'>) {
	const field = useFieldContext<string>()
	const accountField = useField({
		form: field.form,
		name: 'account',
		validators: {
			onChange: accountValidator
		}
	}) as IFieldApi
	const autoComplete = type === 'password' ? 'new-password' : 'off'
	return (
		<div className="space-y-2">
			<Field className={className}>
				{label ? <FieldLabel htmlFor={field.name}>{label}</FieldLabel> : null}
				<Input
					id={accountField.name}
					name={accountField.name}
					value={accountField.state.value as string ?? ""}
					onBlur={accountField.handleBlur}
					onChange={(event) => {
						accountField.handleChange(event.target.value)
					}}
					className={cn(fieldClassName)}
					{...props}
					autoComplete={autoComplete}
				/>
				<FieldValidateError field={accountField} />
			</Field>
			<Field orientation="horizontal">
				<Input type="search"
					name={field.name}
					value={field.state.value as string ?? ""}
					onBlur={field.handleBlur}
					onChange={(event) => {
						field.handleChange(event.target.value)
					}}
					placeholder="请输入收到的验证码" />
				<SendCodeButton />
			</Field>
			<FieldValidateError field={field} />
		</div>
	)
}


function SendCodeButton() {
	const field = useFieldContext()
	const accountValue = field.form.getFieldValue('account')

	const [countdown, setCountdown] = useState(0)

	useEffect(() => {
		if (countdown <= 0) return
		const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
		return () => clearTimeout(timer)
	}, [countdown])

	const { api } = useApi()
	const { mutate, isPending } = useMutation(api.codes.send.mutationOptions({
		onSuccess: () => {
			toast.success('验证码发送成功')
			setCountdown(60)
		},
		onError: (error) => {
			const response = error.response as { message: string, remainingSeconds?: number }
			if (response?.remainingSeconds) {
				// toast.error(`请 ${response.remainingSeconds} 秒后再试`)
				setCountdown(response.remainingSeconds)
			}
		}
	}))
	const send = async () => {
		if (countdown > 0 || isPending) return
		await field.form.validateField('account', 'change')
		const errors = field.form.getFieldMeta('account')?.errors.filter(Boolean)
		if (errors?.length) return
		mutate({
			body: {
				account: accountValue
			}
		})

	}
	return <Button variant={'outline'} type="button" disabled={countdown > 0 || isPending} onClick={send}>
		{countdown > 0 ? `${countdown}秒后再试` : '发送验证码'}
	</Button>
}
