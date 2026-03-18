import { Field, FieldDescription, FieldLabel } from "../components/ui/field"
import { Input } from "../components/ui/input"
import { cn } from "../components/lib/utils"
import { useFieldContext } from "../form"
import type { FormFieldProps } from "../form/types"
import { FieldValidateError } from "./FieldValidateError"

export function FieldInput({ label, description, className, fieldClassName, type, ...props }: FormFieldProps<'input'>): React.JSX.Element {
	const field = useFieldContext<string>()
	const autoComplete = type === 'password' ? 'new-password' : 'off'

	return (
		<Field className={cn('w-full', className)}>
			{label ? <FieldLabel htmlFor={field.name}>{label}</FieldLabel> : null}
			{description ? <FieldDescription>{description}</FieldDescription> : null}
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
