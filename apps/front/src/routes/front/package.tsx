import { createFileRoute } from '@tanstack/react-router'
import type { RouterContextConfig } from '@houdunyun/react/types'
import { PackageList } from '@houdunyun/react/package'

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
