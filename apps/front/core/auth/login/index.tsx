import type { AuthComponentProps } from '#core/auth/types'
import { WechatLoginButton } from '#core/auth/WechatLoginButton'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'
import { useState, type FC, type PropsWithChildren } from 'react'
import { AuthFooter } from '../AuthFooter'
import { EmailLogin } from './EmailLogin'
import { MobileLogin } from './MobileLogin'
import { NameLogin } from './NameLogin'
import { LoginRightSpace } from './Right'

export const Login: FC<PropsWithChildren<AuthComponentProps>> = (props) => {
	const [tab, setTab] = useState('name')
	return (
		<div className="grid xl:grid-cols-[400px_1fr] gap-6 w-full">
			<Card className={cn('flex flex-col gap-6')}>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<User className="w-5 h-5" />
						{props.title || '登录你的账号'}
					</CardTitle>
					<CardDescription>{props.description || '登录网站马上开始你的旅程'}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2 flex-1">
					<Tabs defaultValue={tab} onValueChange={setTab}>
						<TabsList>
							<TabsTrigger value="name">用户名</TabsTrigger>
							<TabsTrigger value="mobile">手机号</TabsTrigger>
							<TabsTrigger value="email">邮箱</TabsTrigger>
						</TabsList>
						<TabsContent value="name" forceMount hidden={tab !== 'name'}>
							<NameLogin />
						</TabsContent>
						<TabsContent value="mobile" forceMount hidden={tab !== 'mobile'}>
							<MobileLogin />
						</TabsContent>
						<TabsContent value="email" forceMount hidden={tab !== 'email'}>
							<EmailLogin />
						</TabsContent>
					</Tabs>
					<WechatLoginButton />
				</CardContent>
				<CardFooter className="flex flex-col justify-center items-center space-y-3">
					<AuthFooter />
				</CardFooter>
			</Card>
			{props.children || <LoginRightSpace />}
		</div>
	)
}
