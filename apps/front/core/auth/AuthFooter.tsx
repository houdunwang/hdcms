import { Button } from "@/components/ui/button"
import { FieldDescription } from "@/components/ui/field"
import type { AuthProps } from "./types"

export const AuthFooter = (props: AuthProps): React.JSX.Element => {
	const WechatLoginButton = props.wechatLoginButton
	return <div className={`space-y-2`}>
		{props.showWechatLoginButton && (
			<a href="/auth?action=wechatLogin" className="w-full flex">
				{WechatLoginButton ??
					<Button variant="outline" type="button" className="w-full" size={'lg'}>
						使用 微信 登录
					</Button>
				}
			</a>
		)}
		{props.footerComponent ??
			<FieldDescription className="text-center text-sm flex items-center justify-center gap-2">
				<a href="/auth?action=login" className="hover:underline">登录</a>
				<span className="text-muted-foreground">·</span>
				<a href="/auth?action=register" className="hover:underline">注册</a>
				<span className="text-muted-foreground">·</span>
				<a href="/auth?action=findPassword" className="hover:underline">找回密码</a>
			</FieldDescription>}
	</div>
}
