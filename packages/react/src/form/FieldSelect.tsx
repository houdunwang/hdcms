import { Field, FieldLabel } from "../components/ui/field"
import { Input } from "../components/ui/input"
import { cn } from "../components/lib/utils"
import { useFieldContext } from "../form"
import type { FormFieldProps } from "../form/types"
import { FieldValidateError } from "./FieldValidateError"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "../components/ui/select"

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
