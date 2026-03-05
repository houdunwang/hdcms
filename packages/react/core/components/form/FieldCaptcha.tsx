import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useFieldContext } from "@/index"
import { useApi } from "@core/hooks/useApi"
import { useQuery } from "@tanstack/react-query"
import type { FormFieldProps } from "core/types/form"
import { useEffect } from "react"
import { ScaleLoader } from "react-spinners"
import { FieldValidateError } from "./FieldValidateError"
export function FieldCaptcha({ label, description, className, fieldClassName, type, ...props }: FormFieldProps<'input'>) {
	const field = useFieldContext<string>()
	const { api } = useApi()
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
			<FieldValidateError field={field} />
		</Field>
	)
}
