import { PackageList } from '@houdunyun/react/package'
import type { RouterContextConfig } from '@houdunyun/react/types'
import { createFileRoute } from '@tanstack/react-router'

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
	return <div className=''>
		<PackageList />
	</div>
}
