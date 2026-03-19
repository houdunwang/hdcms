import { Loading } from "#core/common/Loading"
import { useApi } from "#core/hooks"
import { useQuery } from "@tanstack/react-query"
import { PackageItem } from "./PackageItem"

export const PackageFrontPage = (): React.JSX.Element => {
	const api = useApi()
	const { isLoading, data } = useQuery(api.package.index.queryOptions({
		query: {
			state: 1,
		}
	}))
	if (isLoading) return <Loading />
	return (
		<div className=''>
			<h1 className="text-3xl lg:text-6xl font-bold text-primary text-center mt-20">投资学习是值得的</h1>
			<p className="text-center opacity-50 mt-6 lg:text-xl mb-16 px-6">
				每一个月的权益都是你学习的机会，每一个月的学习都是你进步的阶梯。
			</p>
			<div className="flex gap-6 justify-center flex-wrap mb-12">
				{data?.data.map(item => (
					<PackageItem key={item.id} item={item} />
				))}
			</div>
		</div>
	)
}
