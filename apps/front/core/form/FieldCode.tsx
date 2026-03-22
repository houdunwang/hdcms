import { useFieldContext } from "#core/form"
import type { FormFieldProps } from "#core/form/types"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useField } from "@tanstack/react-form"
import { useEffect } from "react"
import { FieldValidateError } from "./FieldValidateError"
import { SendCodeButton } from "./SendCodeButton"

type CodeType = 'email' | 'mobile'
interface FieldCodeProps extends FormFieldProps<'input'> {
	type: CodeType,
}
export function FieldCode({ label, description, className, fieldClassName, type, ...props }: FieldCodeProps): React.JSX.Element {
	const form = useFieldContext<string>().form
	const value = type === 'email' ? form.state.values.email : form.state.values.mobile
	const field = useField({
		form: form,
		name: type,
	})
	const codeField = useField({
		form: form,
		name: 'code',
	})
	useEffect(() => {
		form.resetField(type == 'email' ? 'mobile' : 'email')
	}, [type])
	return <>
		<Field>
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
				placeholder={type === 'email' ? '请输入邮箱' : '请输入手机号'} />
			<FieldValidateError field={field} />
		</Field >
		<Field className="mt-3">
			<div className="flex items-center gap-3">
				<Input
					id={codeField.name}
					name={codeField.name}
					value={codeField.state.value as string ?? ""}
					onBlur={codeField.handleBlur}
					onChange={(event) => {
						codeField.handleChange(event.target.value)
					}}
					{...props}
					autoComplete='off'
					placeholder={'请输入收到的验证码'} />
				<SendCodeButton type={type} value={value} />
			</div>
			<FieldValidateError field={codeField} />
		</Field >
	</>
}
