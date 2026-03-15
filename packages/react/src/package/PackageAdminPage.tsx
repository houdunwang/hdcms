import { Loading } from "@/common"
import { DelResource } from "@/common/DelResource"
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
import { FormDialog } from "@/form/FormDialog"
import { useApi } from "@/hooks"
import { useQuery } from "@tanstack/react-query"
import { CircleCheck } from "lucide-react"
import type { JSX } from "react"
import { FormPackage } from "./FormPackage"
export const PackageAdminPage = (): JSX.Element => {
	const { api } = useApi()
	const { isLoading, data } = useQuery(api.package.index.queryOptions())
	if (isLoading || !data?.data) return <Loading screen />
	return (
		<Card>
			<CardHeader className="border-b">
				<CardTitle>
					<div className="flex justify-between w-full">
						套餐管理
						<FormDialog title="添加套餐" buttonText="" button={{ variant: 'ghost', size: 'lg' }}>
							{({ closeDialog }) => <FormPackage closeDialog={closeDialog} />}
						</FormDialog>
					</div>
				</CardTitle>
				<CardDescription>网站订阅套餐管理</CardDescription>
			</CardHeader>
			<CardContent>
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
								<TableCell>{item.state && <CircleCheck size={16} />}</TableCell>
								<TableCell className="w-20">{item.price}</TableCell>
								<TableCell className="flex justify-end">
									<ButtonGroup>
										<FormDialog id={item.id} title="编辑套餐" buttonText="">
											{({ closeDialog, id }) => <FormPackage closeDialog={closeDialog} id={id} />}
										</FormDialog>
										<DelResource title="删除套餐" onSuccess={() => alert(3)} buttonText="" />
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
