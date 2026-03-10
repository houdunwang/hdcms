import { Loading } from "@/common/Loading"
import { useApi } from "@/hooks"
import { useQuery } from "@tanstack/react-query"
import { PackageItem } from "./PackageItem"

export const PackageList = () => {
	const { api } = useApi()
	const { isLoading, data } = useQuery(api.package.index.queryOptions())
	if (isLoading) return <Loading />
	return (
		<div className="flex gap-6 justify-center">
			{data?.data.map(item => (
				<PackageItem key={item.id} item={item} />
			))}
		</div>
	)
}
