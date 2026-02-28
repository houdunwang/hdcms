import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useFormField, } from "core/hooks/useFormField"
import type { FormFieldProps } from "core/types/form"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { ScaleLoader } from "react-spinners"
import { useApi } from "@core/hooks/useApi"
import { useFieldContext } from "@core/hd"
export function FieldCaptcha({ label, description, className, fieldClassName, type, ...props }: FormFieldProps<'input'>) {
	const field = useFieldContext<string>()
	const { api } = useApi()
	const { FieldErrorComponent, errorComponentRef } = useFormField()
	const autoComplete = type === 'password' ? 'new-password' : 'off'
	const { data, isFetching, refetch } = useQuery(
		api.captcha.queryOptions()
	)
	useEffect(() => {
		if (data?.data.key) {
			field.form.setFieldValue('captcha_key', data.data.key)
		}
	}, [data?.data?.key])

	return (
		<Field className={className}>
			{label ? <FieldLabel htmlFor='field-image-captcha'>{label}</FieldLabel> : null}
			<div className="grid grid-cols-[1fr_auto] gap-2">
				<Input
					id="field-image-captcha"
					name={field.name}
					type={type}
					value={field.state.value ?? ""}
					onBlur={field.handleBlur}
					placeholder="请输入右侧加法结果"
					onChange={(event) => {
						field.handleChange(event.target.value)
						errorComponentRef.current?.clear()
					}}
					{...props}
					autoComplete={autoComplete}
				/>
				{<div className="border border-input rounded-sm h-[32px] w-[120px] flex items-center justify-center cursor-pointer" onClick={() => refetch()}>
					{isFetching ?
						<ScaleLoader height={20} color="#e74c3c" /> :
						<div dangerouslySetInnerHTML={{ __html: data?.data?.svg || '' }} />
					}
				</div>}
			</div>
			{FieldErrorComponent}
		</Field>
	)
}
