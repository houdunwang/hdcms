import { Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useFieldContext } from "#core/form"
import type { FormFieldProps } from "#core/form/types"
import { FieldValidateError } from "./FieldValidateError"

interface Props extends FormFieldProps<'input'> {
	defaultValue: any
	options: {
		label: string
		value: string
	}[]
}
export function FieldSelect({ label, defaultValue, description, className, fieldClassName, type, placeholder, options, ...props }: Props): React.JSX.Element {
	const field = useFieldContext<string>()

	return (
		<Field className={cn('h-full', className)}>
			{label ? <FieldLabel htmlFor={field.name}>{label}</FieldLabel> : null}
			<Select
				defaultValue={defaultValue}
				onValueChange={(value) => {
					field.handleChange(value)
				}}>
				<SelectTrigger className={cn('h-full', fieldClassName)}>
					<SelectValue placeholder={placeholder} className="h-full flex" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup >
						<SelectLabel>{placeholder}</SelectLabel>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<FieldValidateError field={field} />
		</Field>
	)
}
