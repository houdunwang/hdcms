import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { useFormContext } from '@/routes/__root'

type Props = Omit<
	React.ComponentProps<"button">,
	"name" | "value" | "onChange" | "onBlur" | "id"
> & {
	label?: React.ReactNode
	description?: React.ReactNode
	className?: string
	inputClassName?: string
}

export const FieldSubscribeButton = ({ className, label, ...props }: Props) => {
	const form = useFormContext()
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => {
				return <Field className={className}>
					<Button disabled={isSubmitting} {...props}>{isSubmitting ? "提交中" : label || "保存提交"}</Button>
				</Field>
			}}
		</form.Subscribe>
	)
}
