import { Loading } from '#core/common'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useApi } from '#core/hooks'
import type { Data } from '@app/admin/data'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import type { FC, JSX } from 'react'

type Props = {
	order: Data.Order
}
export const SubscribeDetail: FC<Props> = ({ order }): JSX.Element => {
	const api = useApi();
	const { isLoading, data: subscribe } = useQuery(api.subscribe.show.queryOptions({
		params: { id: order.orderableId }
	}))
	if (isLoading) return <Loading />
	return (
		<>
			<Field>
				<FieldLabel htmlFor="username">订阅到期时间</FieldLabel>
				<Input type="text" defaultValue={dayjs(subscribe?.data.endTime).format('YYYY-MM-DD HH:mm:ss') || ''} />
			</Field>

		</>
	)
}
