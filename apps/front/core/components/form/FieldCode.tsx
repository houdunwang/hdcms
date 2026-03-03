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
const codeValidator = z.string().min(1, '请输入验证码!!!')

type AccountType = 'email' | 'mobile'
interface Props extends FormFieldProps<'input'> {
	type: AccountType
}
export function FieldCode({ label, description, className, fieldClassName, type, ...props }: Props) {
	const field = useFieldContext<string>()
	// const field = useField({
	// 	form: form,
	// 	name: 'code',
	// 	// validators: {
	// 	// 	onChange: codeValidator
	// 	// }
	// }) as IFieldApi

	// const accountField = useField({
	// 	form: form,
	// 	name: 'account',
	// 	// validators: {
	// 	// 	onChange: z.string()
	// 	// 		.refine(val => {
	// 	// 			if (type === 'email') {
	// 	// 				return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)
	// 	// 			}
	// 	// 			return /^1[3-9]\d{9}$/.test(val)
	// 	// 		}, `请输入正确的${type === 'email' ? '邮箱' : '手机号'}`)
	// 	// }
	// }) as IFieldApi
	// // accountField.options.validators?.onChange(accountField.state.value as string)

	return (
		<div className={cn('space-y-3', className)}>
			{/* <Field orientation="vertical">
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
					autoComplete='off'
				/>
				<FieldValidateError field={accountField} />
			</Field> */}
			<Field orientation="horizontal" className={cn('w-full', fieldClassName)}>
				<Input
					id={field.name}
					name={field.name}
					value={field.state.value as string ?? ""}
					onBlur={field.handleBlur}
					onChange={(event) => {
						field.handleChange(event.target.value)
					}}
					{...props}
					autoComplete='off'
					placeholder="请输入收到的验证码" />
				<SendCodeButton type={type} />
			</Field>
			<FieldValidateError field={field} />
		</div>
	)
}


function SendCodeButton({ type }: { type: AccountType }) {
	const field = useFieldContext()
	const accountFieldMeta = field.form.getFieldMeta('account')
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
				setCountdown(response.remainingSeconds)
			}
		}
	}))
	const send = async () => {
		if (accountFieldMeta?.isValid === false) {
			toast.error(type === 'email' ? '请输入正确的邮箱' : '请输入正确的手机号')
			return
		}
		if (countdown > 0 || isPending) return
		const errors = field.form.getFieldMeta('account')?.errors.filter(Boolean)
		if (errors?.length) return
		mutate({
			params: {
				type: type
			},
			body: {
				account: accountValue
			}
		})

	}
	return <Button variant={'outline'} type="button" disabled={countdown > 0 || isPending || !accountFieldMeta?.isValid} onClick={send}>
		{countdown > 0 ? `${countdown}秒后再试` : '发送验证码'}
	</Button>
}
