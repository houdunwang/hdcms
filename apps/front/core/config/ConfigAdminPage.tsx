import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "../components/ui/tabs"
import { useState, type FC } from 'react'
import { Aliyun } from './Aliyun'
import { Base } from './Base'
import { Email } from './Email'
import { Sms } from './Sms'
import { Upload } from './Upload'
import { Wechat } from './Wechat'
import { WePay } from './Wepay'
const configs = {
	base: <Base />,
	aliyun: <Aliyun />,
	wepay: <WePay />,
	email: <Email />,
	sms: <Sms />,
	wechat: <Wechat />,
	upload: <Upload />
}
export const ConfigAdminPage: FC = () => {
	const [value, setValue] = useState('base')
	// const { useAppForm } = hdCreateFormHook()
	// const form = useAppForm({
	// 	defaultValues: {} as any,
	// 	onSubmit: async ({ value: body }) => {
	// 		console.log('	', body)
	// 		// await form.handleSubmit()
	// 	}
	// })
	return (
		<Tabs value={value} onValueChange={setValue}>
			<TabsList>
				<TabsTrigger value="base" >基本配置</TabsTrigger>
				<TabsTrigger value="aliyun" >阿里云</TabsTrigger>
				<TabsTrigger value="wepay">微信支付</TabsTrigger>
				<TabsTrigger value="email">邮件发送</TabsTrigger>
				<TabsTrigger value="sms">手机短信</TabsTrigger>
				<TabsTrigger value="wechat">微信公众号</TabsTrigger>
				<TabsTrigger value="upload">文件上传</TabsTrigger>
			</TabsList>
			<TabsContent value={value}>
				<Card>
					<CardHeader>
						<CardTitle></CardTitle>
						<CardDescription></CardDescription>
					</CardHeader>
					<CardContent className="text-sm text-muted-foreground">
						{configs[value as keyof typeof configs]}
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	)
}
