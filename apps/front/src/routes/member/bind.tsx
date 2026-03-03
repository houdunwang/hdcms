import { createFileRoute } from '@tanstack/react-router'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs"
import { BindWechat } from './-components/bind-wechat'

export const Route = createFileRoute('/member/bind')({
	component: RouteComponent,
})

export function RouteComponent() {
	return (
		<Tabs defaultValue="wechat">
			<TabsList>
				<TabsTrigger value="overview">邮箱绑定</TabsTrigger>
				<TabsTrigger value="analytics">手机号绑定</TabsTrigger>
				<TabsTrigger value="wechat">微信绑定</TabsTrigger>
				<TabsTrigger value="reports">注销帐号</TabsTrigger>
			</TabsList>
			<TabsContent value="wechat">
				<Card>
					<CardContent>
						<BindWechat />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="analytics">
				<Card>
					<CardHeader>
						<CardTitle>Analytics</CardTitle>
						<CardDescription>
							Track performance and user engagement metrics. Monitor trends and
							identify growth opportunities.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-muted-foreground text-sm">
						Page views are up 25% compared to last month.
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="reports">
				<Card>
					<CardHeader>
						<CardTitle>Reports</CardTitle>
						<CardDescription>
							Generate and download your detailed reports. Export data in
							multiple formats for analysis.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-muted-foreground text-sm">
						You have 5 reports ready and available to export.
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="settings">
				<Card>
					<CardHeader>
						<CardTitle>Settings</CardTitle>
						<CardDescription>
							Manage your account preferences and options. Customize your
							experience to fit your needs.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-muted-foreground text-sm">
						Configure notifications, security, and themes.
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	)
}
