import { Loading } from "@/common/Loading"
import { useApi } from "@/hooks"
import { useQuery } from "@tanstack/react-query"
import { PackageItem } from "./PackageItem"

export const PackageList = (): React.JSX.Element => {
	const { api } = useApi()
	const { isLoading, data } = useQuery(api.package.index.queryOptions())
	if (isLoading) return <Loading />
	return (
		<div className="">
			<h1 className="text-6xl font-bold text-primary text-center mt-20">投资学习是值得的</h1>
			<p className="text-center text-sm opacity-50 mt-6 text-xl mb-16">
				每一个月的权益都是你学习的机会，每一个月的学习都是你进步的阶梯。
			</p>
			<div className="flex gap-6 justify-center">
				{data?.data.map(item => (
					<PackageItem key={item.id} item={item} />
				))}
			</div>
		</div>
	)
}
