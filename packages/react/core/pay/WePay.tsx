import { Button } from '@/components/ui/button';
import { useApi } from '@core/hooks';
import { useMutation } from '@tanstack/react-query';

interface Props {
	subject: string,
	orderable_type: any
	orderable_id: number,
}

export const WePay = (props: Props) => {
	const { api } = useApi()
	const mutation = useMutation(api.pays.mutationOptions({
		onSuccess: () => {
			console.log('支付成功')
		}
	}))
	return (
		<Button onClick={() => {
			mutation.mutate({
				body: {
					subject: props.subject,
					orderable_type: props.orderable_type,
					orderable_id: props.orderable_id,
				}
			})
		}}>WePay</Button>
	)
}
