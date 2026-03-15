import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { useFieldContext } from "@/form"
import type { FormFieldProps } from "@/form/types"
import { cn } from "@/lib/utils"
import { FieldValidateError } from "./FieldValidateError"

export function FieldTextarea({ label, description, className, fieldClassName, ...props }: FormFieldProps<'textarea'>): React.JSX.Element {
	const field = useFieldContext<string>()
	return (
		<Field className={cn('w-full', className)}>
			{label ? <FieldLabel htmlFor={field.name}>{label}</FieldLabel> : null}
			{description ? <FieldDescription>{description}</FieldDescription> : null}
			<Textarea
				id={field.name}
				name={field.name}
				value={field.state.value ?? ""}
				onBlur={field.handleBlur}
				onChange={(event) => {
					field.handleChange(event.target.value)
				}}
				className={cn(fieldClassName)}
				{...props}
				autoComplete={'off'}
			/>
			<FieldValidateError field={field} />
		</Field>
	)
}
