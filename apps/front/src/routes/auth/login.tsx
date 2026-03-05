import { LoginLayout, LoginComponent, LoginIntroduce } from '@hd/react/components'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/auth/login')({
	component: Page
})

function Page() {
	return <LoginLayout introduce={<LoginIntroduce />}>
		<LoginComponent />
	</LoginLayout>
}

