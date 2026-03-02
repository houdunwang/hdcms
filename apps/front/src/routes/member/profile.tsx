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
import { ProfileInfo } from './-components/profile-info'
import { ProfilePassword } from './-components/profile-password'
import { ProfileAvatar } from './-components/profile-avatar'

export const Route = createFileRoute('/member/profile')({
	component: RouteComponent,
})

export function RouteComponent() {
	return (
		<Tabs defaultValue="avatar">
			<TabsList>
				<TabsTrigger value="overview">基础资料</TabsTrigger>
				<TabsTrigger value="analytics">修改密码</TabsTrigger>
				<TabsTrigger value="avatar">用户头像</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">
				<Card>
					<CardContent className="text-muted-foreground">
						<ProfileInfo />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="analytics">
				<Card>
					<CardContent className="text-muted-foreground text-sm">
						<ProfilePassword />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="avatar">
				<Card>
					<CardContent>
						<ProfileAvatar />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	)
}
