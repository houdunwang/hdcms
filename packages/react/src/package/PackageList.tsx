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

			<div className="flex gap-6 justify-center flex-wrap mb-12">
				{data?.data.map(item => (
					<PackageItem key={item.id} item={item} />
				))}
			</div>
		</div>
	)
}
