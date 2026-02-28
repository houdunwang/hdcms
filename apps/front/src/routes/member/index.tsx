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

export const Route = createFileRoute('/member/')({
	component: RouteComponent,
})

export function RouteComponent() {
	return (
		<Tabs defaultValue="overview">
			<TabsList>
				<TabsTrigger value="overview">基础资料</TabsTrigger>
				<TabsTrigger value="analytics">修改密码</TabsTrigger>
				<TabsTrigger value="reports">用户头像</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">
				<Card>
					<CardHeader>
						<CardTitle>Overview</CardTitle>
						<CardDescription>
							View your key metrics and recent project activity. Track progress
							across all your active projects.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-muted-foreground text-sm">
						You have 12 active projects and 3 pending tasks.
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
