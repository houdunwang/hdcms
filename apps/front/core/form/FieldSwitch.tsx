import { useFieldContext } from "#core/form"
import type { FormFieldProps } from "#core/form/types"
import { Field, FieldLabel } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Switch, } from '@/components/ui/switch'
import { cn } from "@/lib/utils"
import { FieldValidateError } from "./FieldValidateError"
export function FieldSwitch({ label, title, className }: FormFieldProps<'input'>): React.JSX.Element {
	const field = useFieldContext<boolean | number>()
	return (
		<Field className={cn('w-full', className)}>
			{label ? <FieldLabel htmlFor={field.name}>{label}</FieldLabel> : null}
			<div className="flex items-center space-x-2">
				<Switch id="airplane-mode" checked={Boolean(field.state.value)} onCheckedChange={(checked) => {
					field.handleChange(checked)
				}} />
				<Label htmlFor="airplane-mode">{title}</Label>
			</div>
			<FieldValidateError field={field} />
		</Field>
	)
}
