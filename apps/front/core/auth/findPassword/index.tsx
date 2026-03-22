import { fieldErrorAtom } from '#core/store/fieldErrorAtom.ts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useSetAtom } from 'jotai'
import { ShieldCheck } from 'lucide-react'
import { useState } from "react"
import { AuthFooter } from "../AuthFooter"
import type { AuthComponentProps } from "../types"
import { WechatLoginButton } from "../WechatLoginButton"
import { FindPasswordRightSpace } from "./right"
import { EmailFind } from './EmailFind'
import { MobileFind } from './MobileFind'

export function FindPassword(props: AuthComponentProps): React.JSX.Element {
	const [tab, setTab] = useState('mobile')

	return (
		<div className="grid xl:grid-cols-[400px_1fr] gap-6 w-full">
			<Card className={cn("flex flex-col gap-6")} >
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<ShieldCheck />
						找回密码
					</CardTitle>
					<CardDescription>找回网站登录密码</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">
					<Tabs value={tab} onValueChange={setTab}>
						<TabsList>
							<TabsTrigger value="email">邮箱找回</TabsTrigger>
							<TabsTrigger value="mobile">手机号找回</TabsTrigger>
						</TabsList>
						<TabsContent forceMount value="email" hidden={tab !== 'email'}>
							<EmailFind />
						</TabsContent>
						<TabsContent forceMount value="mobile" hidden={tab !== 'mobile'}>
							<MobileFind />
						</TabsContent>
					</Tabs>
					<WechatLoginButton />
				</CardContent>
				<CardFooter className="flex flex-col justify-center items-center space-y-3">
					<AuthFooter />
				</CardFooter>
			</Card>
			{props.children || <FindPasswordRightSpace />}
		</div>
	)
}
