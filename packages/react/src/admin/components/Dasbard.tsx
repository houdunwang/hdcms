import React from 'react'
import { Sales } from './dasbard/Sales'
import { Total } from './dasbard/total'

export const Dasbard = (): React.JSX.Element => {
	return (
		<div className="@container/main flex flex-1 flex-col gap-2">
			<Total />
			<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				<Sales />
			</div>
		</div>
	)
}
