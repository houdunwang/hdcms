import { Loading } from "@/common"
import { DelResource } from "@/common/DelResource"
import { EditResource } from "@/common/EditResource"
import { ButtonGroup } from "@/components/ui/button-group"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table"
import { useApi } from "@/hooks"
import { useQuery } from "@tanstack/react-query"
import type { JSX } from "react"
import { EditPackage } from "./EditPackage"
export const PackageAdminPage = (): JSX.Element => {
	const { api } = useApi()
	const { isLoading, data } = useQuery(api.package.index.queryOptions())
	if (isLoading || !data?.data) return <Loading />
	return (
		<Card>
			<CardHeader>
				<CardTitle>套餐管理</CardTitle>
				<CardDescription>网站订阅套餐管理</CardDescription>
			</CardHeader>
			<CardContent>
				<EditPackage closeDialog={() => { }} id={1} />
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-10">ID</TableHead>
							<TableHead>名称</TableHead>
							<TableHead>广告语</TableHead>
							<TableHead>可用月数</TableHead>
							<TableHead>开启</TableHead>
							<TableHead>价格</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>

						{data.data.map((item) => (
							<TableRow key={item.id}>
								<TableCell className="font-medium">{item.id}</TableCell>
								<TableCell>{item.title}</TableCell>
								<TableCell>{item.ad}</TableCell>
								<TableCell>{item.months}个月</TableCell>
								<TableCell>{item.state ? "已启用" : "已禁用"}</TableCell>
								<TableCell className="w-20">{item.price}</TableCell>
								<TableCell className="flex justify-end">
									<ButtonGroup>
										<EditResource id={item.id} title="编辑套餐" >
											{({ closeDialog, id }) => <EditPackage closeDialog={closeDialog} id={id} />}
										</EditResource>
										<DelResource title="删除套餐" onSuccess={() => alert(3)} />
									</ButtonGroup>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
