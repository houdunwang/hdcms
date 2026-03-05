import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { FieldDescription } from "@/components/ui/field"
import { Link } from "@tanstack/react-router"

interface Props {
	className?: string,
	showWechatLoginButton?: boolean
}
export const Footer = ({ className, showWechatLoginButton = true }: Props) => {
	return <CardFooter className="flex justify-center">
		<div className={`space-y-2 ${className}`}>
			{showWechatLoginButton && (
				<Link to="/auth/wechat" className="w-full flex">
					<Button variant="outline" type="button" className="w-full" size={'lg'}>
						使用 微信 登录
					</Button>
				</Link>
			)}
			<FieldDescription className="text-center text-sm flex items-center justify-center gap-2">
				<Link to="/auth/login" className="hover:underline">登录</Link>
				<span className="text-muted-foreground">·</span>
				<Link to="/auth/register" className="hover:underline">注册</Link>
				<span className="text-muted-foreground">·</span>
				<Link to="/auth/forget" className="hover:underline">找回密码</Link>
			</FieldDescription>
		</div>
	</CardFooter>
}
