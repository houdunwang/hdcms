import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useFormField, } from "@/hooks/useFormField"
import { cn } from "@/lib/utils"
import { useFieldContext } from "@/routes/__root"
import type { FormFieldProps } from "@/types/form"

export function FieldInput({ label, description, className, fieldClassName, type, ...props }: FormFieldProps<'input'>) {
	const field = useFieldContext<string>()
	const { FieldErrorComponent, errorComponentRef } = useFormField()
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
					errorComponentRef.current?.clear()
				}}
				className={cn(fieldClassName)}
				{...props}
				autoComplete={autoComplete}
			/>
			{FieldErrorComponent}
		</Field>
	)
}
