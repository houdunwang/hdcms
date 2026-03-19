import { FieldDescription } from "@/components/ui/field"
import { Link } from "@tanstack/react-router"

export const AuthFooter = () => {
	return <div className={`space-y-2`}>
		<FieldDescription className="text-center text-sm flex items-center justify-center gap-2">
			<Link to="/auth/login" className="hover:underline">登录</Link>
			<span className="text-muted-foreground">·</span>
			<Link to="/auth/register" className="hover:underline">注册</Link>
			<span className="text-muted-foreground">·</span>
			<Link to="/auth/findPassword" className="hover:underline">找回密码</Link>
		</FieldDescription>
	</div>
}
