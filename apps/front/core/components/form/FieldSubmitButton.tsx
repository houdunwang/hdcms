import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { useFormContext } from '@core/hd'
import { BounceLoader, MoonLoader, PacmanLoader, PuffLoader, ScaleLoader } from 'react-spinners'

type Props = Omit<
	React.ComponentProps<"button">,
	"name" | "value" | "onChange" | "onBlur" | "id"
> & {
	label?: React.ReactNode
	description?: React.ReactNode
	fieldClassName?: string
	buttonClassName?: string
}

export const FieldSubmitButton = ({ className, fieldClassName, label, ...props }: Props) => {
	const form = useFormContext()
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => {
				return <div className={fieldClassName}>
					<Button type='submit' size={'lg'}
						disabled={isSubmitting} {...props}
						className={className}
						variant={isSubmitting ? 'outline' : 'default'}>
						{isSubmitting ? <><MoonLoader size={15} />提交中...</> : label || "保存提交"}
					</Button>
				</div>
			}}
		</form.Subscribe >
	)
}
