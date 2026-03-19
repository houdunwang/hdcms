import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { DeleteAccount } from './-components/DeleteAccount'
import { BindEmail } from './-components/bind-email'
import { BindMobile } from './-components/bind-mobile'
import { BindWechat } from './-components/bind-wechat'

export const Bind = () => {
	return (
		<Tabs defaultValue="email">
			<TabsList>
				<TabsTrigger value="email">邮箱绑定</TabsTrigger>
				<TabsTrigger value="mobile">手机号绑定</TabsTrigger>
				<TabsTrigger value="wechat">微信绑定</TabsTrigger>
				<TabsTrigger value="destroy">注销帐号</TabsTrigger>
			</TabsList>
			<TabsContent value="wechat">
				<Card>
					<CardContent>
						<BindWechat />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="email">
				<Card>
					<CardContent>
						<BindEmail />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="mobile">
				<Card>
					<CardContent>
						<BindMobile />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="destroy">
				<Card>
					<CardContent>
						<DeleteAccount />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	)
}
