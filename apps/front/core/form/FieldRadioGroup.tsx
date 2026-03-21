import { Field } from "#/components/ui/field"
import { cn } from "#/lib/utils"
import { FieldValidateError, useFieldContext } from "#core/form"
import type { FormFieldProps } from "#core/form/types"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState, type FC } from "react"

type Props = FormFieldProps<'input'> & {
	options: {
		label: string,
		value: string | number | boolean
	}[]
}
export const FieldRadioGroup: FC<Props> = ({ label, title, description, className, fieldClassName, type, options, ...props }) => {
	const field = useFieldContext<string | number | boolean>()
	const [defaultValue, setDefaultValue] = useState<string>(field.state.value.toString())
	return (
		<Field className={cn('w-full', className)}>
			<RadioGroup defaultValue={defaultValue} onValueChange={(value) => {
				field.handleChange(value)
				setDefaultValue(value)
			}} className="w-fit">
				{options.map((options, index) => (
					<div className="flex items-center gap-3" key={index}>
						<RadioGroupItem value={options.value.toString()} id={'r-' + index} />
						<Label htmlFor={'r-' + index}>{options.label}</Label>
					</div>
				))}
			</RadioGroup>
			<FieldValidateError field={field} />
		</Field>
		// <Field className={cn('w-full', className)}>
		// 	{label ? <FieldLabel htmlFor={field.name}>{label}</FieldLabel> : null}
		// 	<div className="flex items-center space-x-2">
		// 		<Switch id="airplane-mode" checked={Boolean(field.state.value)} onCheckedChange={(checked) => {
		// 			field.handleChange(checked)
		// 		}} />
		// 		<Label htmlFor="airplane-mode">{title}</Label>
		// 	</div>
		// 	<FieldValidateError field={field} />
		// </Field>
	)
}
