import { createFileRoute } from '@tanstack/react-router'
import type { RouterContextConfig } from '@houdunyun/react/types'
import { PackageList } from '@houdunyun/react/package'
import { useApi } from '@houdunyun/react/hooks'

export const Route = createFileRoute('/front/package')({
	component: RouteComponent,
	beforeLoad() {
		return {
			config: {
				title: '订阅网站',
			} as RouterContextConfig
		}
	},
})

function RouteComponent() {
	const { } = useApi()
	return <div className=''>
		<PackageList />
	</div>
}
