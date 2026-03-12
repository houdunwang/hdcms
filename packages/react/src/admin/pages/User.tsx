import { Loading, UserAvatar } from '@/common'
import { Page } from '@/common/Page'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useApi } from '@/hooks'
import { useCommon } from '@/hooks/useCommon'
import { useQuery } from '@tanstack/react-query'
import { CircleCheckBig } from "lucide-react"
import { type JSX } from 'react'

export function User(): JSX.Element {
	const { api } = useApi()
	const { getCurrentPage } = useCommon()
	const { isLoading, data } = useQuery(api.users.index.queryOptions({
		query: { page: getCurrentPage() }
	}))

	if (isLoading) return <Loading />
	if (!data?.data) return <></>
	const users = data.data
	return (
		<Card className=''>
			<CardHeader>
				<CardTitle>用户管理</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent>
				<Table className='bor1der'>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>头像</TableHead>
							<TableHead>帐号</TableHead>
							<TableHead>昵称</TableHead>
							<TableHead>邮箱</TableHead>
							<TableHead>手机号</TableHead>
							<TableHead>绑定微信</TableHead>
							<TableHead className="text-right"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map(user => (
							<TableRow>
								<TableCell className="font-medium">{user.id}</TableCell>
								<TableCell>
									<UserAvatar user={user} />
								</TableCell>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.nickname}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.mobile}</TableCell>
								<TableCell>
									{user.openid ? <CircleCheckBig size={16} /> : null}
								</TableCell>
								<TableCell className="text-right pr-5">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon" className="size-8">
												{/* <MoreHorizontalIcon /> */}
												{/* 操作 */}
												<Button variant={'outline'} size={'sm'}>操作</Button>
												<span className="sr-only">Open menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>Edit</DropdownMenuItem>
											<DropdownMenuItem>Duplicate</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem variant="destructive">
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>
				<Page meta={data.metadata} />
			</CardFooter>
		</Card>
	)
}


