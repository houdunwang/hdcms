import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useFormContext } from '@/form'

type Props = Omit<
	React.ComponentProps<"button">,
	"name" | "value" | "onChange" | "onBlur" | "id"
> & {
	label?: React.ReactNode
	description?: React.ReactNode
	fieldClassName?: string
	buttonClassName?: string
} & {
	[key: string]: any
}

export const FieldSubmitButton = ({ className, fieldClassName, label, ...props }: Props): React.JSX.Element => {
	const form = useFormContext()
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => {
				return <div className={fieldClassName}>
					<Button
						type='submit'
						{...props}
						disabled={isSubmitting}
						className={className}
						variant={isSubmitting ? 'outline' : 'default'}>
						{isSubmitting ? <><Spinner />提交中...</> : label || "保存提交"}
					</Button>
				</div>
			}}
		</form.Subscribe >
	)
}
