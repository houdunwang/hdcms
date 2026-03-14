import { PackageList } from '@hdcms/react/package'
import type { RouterContextConfig } from '@hdcms/react/types'
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
		<h1 className="text-3xl lg:text-6xl font-bold text-primary text-center mt-20">投资学习是值得的</h1>
		<p className="text-center opacity-50 mt-6 lg:text-xl mb-16 px-6">
			每一个月的权益都是你学习的机会，每一个月的学习都是你进步的阶梯。
		</p>
		<PackageList />
	</div>
}
