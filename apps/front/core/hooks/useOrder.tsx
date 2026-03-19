import { SubscribeDetail } from '#core/order/SubscribeDetail'
import type { Data } from '@app/admin/data'
import { useState, type Dispatch, type SetStateAction } from 'react'

export type orderType = {
	name: string
	label: string
	detailComponent: React.FC<{ order: Data.Order, type: orderType }>
}

type hookType = {
	getOrerType: (type: string) => orderType | undefined
	setTypes: Dispatch<SetStateAction<orderType[]>>
	types: orderType[]
}

export const useOrder = (): hookType => {
	const [types, setTypes] = useState<orderType[]>([
		{ name: 'subscribe', label: '用户订阅', detailComponent: SubscribeDetail }
	])

	const getOrerType = (type: string) => types.find(item => item.name === type)
	return {
		getOrerType,
		setTypes,
		types
	}
}
