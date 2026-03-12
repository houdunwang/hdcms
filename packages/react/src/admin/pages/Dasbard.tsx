import React from 'react'
import { Sales } from '../components/layout/dasbard/Sales'
import { Total } from '../components/layout/dasbard/Total'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { Loading } from '@/common'
export const Dasbard = (): React.JSX.Element => {
	const { api } = useApi()
	const { isLoading, data } = useQuery(api.admin.queryOptions())
	if (isLoading) return <Loading />
	return (
		<div className="@container/main flex flex-1 flex-col gap-2">
			{data?.data && <Total data={data.data} />}
			<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				{data?.data && <Sales data={data.data} />}
			</div>
		</div>
	)
}
