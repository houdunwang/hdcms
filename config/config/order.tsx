import type { Data } from '@app/admin/data';
import { FC } from 'react';

type configType = {
	name: string,
	label: string,
	detailComponent: FC<{ order: Data.Order }>,
}

const configType = [] as configType[]

export const orderTypes = {
	subscribe: {
		name: 'subscribe',
		label: '网站订阅',
		detailPage: (id: number) => '/subscribe'
	}
}