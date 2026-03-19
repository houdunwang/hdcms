import { cn } from '#/lib/utils'
import { useFormContext } from '#core/form'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

type Props = Omit<
	React.ComponentProps<"button">,
	"name" | "value" | "onChange" | "onBlur" | "id"
> & {
	label?: React.ReactNode
	description?: React.ReactNode
	buttonClassName?: string
} & {
	[key: string]: any
}

export const FieldSubmitButton = ({ className, buttonClassName, label, ...props }: Props): React.JSX.Element => {
	const form = useFormContext()
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => {
				return <div className={cn('mt-3', className)}>
					<Button
						type='submit'
						size={'lg'}
						{...props}
						disabled={isSubmitting}
						className={buttonClassName}
						variant={isSubmitting ? 'outline' : 'default'}>
						{isSubmitting ? <><Spinner />提交中...</> : label || "保存提交"}
					</Button>
				</div>
			}}
		</form.Subscribe >
	)
}
