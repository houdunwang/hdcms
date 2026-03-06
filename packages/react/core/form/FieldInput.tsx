import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useFieldContext } from "@/index"
import type { FormFieldProps } from "@core/form/types"
import { FieldValidateError } from "./FieldValidateError"

export function FieldInput({ label, description, className, fieldClassName, type, ...props }: FormFieldProps<'input'>) {
	const field = useFieldContext<string>()
	const autoComplete = type === 'password' ? 'new-password' : 'off'

	return (
		<Field className={className}>
			{label ? <FieldLabel htmlFor={field.name}>{label}</FieldLabel> : null}
			<Input
				id={field.name}
				name={field.name}
				type={type}
				value={field.state.value ?? ""}
				onBlur={field.handleBlur}
				onChange={(event) => {
					field.handleChange(event.target.value)
				}}
				className={cn(fieldClassName)}
				{...props}
				autoComplete={autoComplete}
			/>
			<FieldValidateError field={field} />
		</Field>
	)
}
