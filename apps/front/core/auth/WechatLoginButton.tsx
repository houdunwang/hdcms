import { Button } from '#/components/ui/button'
import { Link } from '@tanstack/react-router'

export const WechatLoginButton = () => {
	return (
		<Link to="/auth/wechatLogin" className="flex">
			<Button variant="outline" type="button" className="w-full" size={'lg'}>
				使用 微信 登录
			</Button>
		</Link>
	)
}
