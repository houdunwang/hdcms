import { LoginLayout, WechatIntroduce, WechatLoginComponent } from '@houdunyun/react/components'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/wechat')({
	component: Page,
})

function Page() {
	return <LoginLayout introduce={<WechatIntroduce />}>
		<WechatLoginComponent />
	</LoginLayout>

}

