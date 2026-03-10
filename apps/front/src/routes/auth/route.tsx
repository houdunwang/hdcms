import { HeaderBar } from '@/components/common/HeaderBar'
import { Button } from '@/components/ui/button'
import { LoginRightSpace } from '@houdunyun/react/auth'
import { AuthLayout } from '@houdunyun/react/auth'
import { Footer } from '@houdunyun/react/common'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { CodeXml } from 'lucide-react'

export const Route = createFileRoute('/auth')({
	beforeLoad: ({ context }) => {
		if (context.auth.isAuthenticated(true)) {
			throw redirect({ to: '/' })
		}
	},
	component: RouteComponent,
})

function RouteComponent() {
	return <div className=''>
		<HeaderBar />

		<AuthLayout className="container mx-auto mt-20 p-3 min-h-[calc(100vh-var(--header-height))]"
			helperComponent={<div>高质量编程课程，帮助你快速提升编程技能</div>}
			showWechatLoginButton={true}
			wechatLoginButton={<Button variant={'outline'} className='w-full'>微信登录</Button>}
			components={
				{
					login: {
						rightSpace: <LoginRightSpace />
					}
				}
			}
		/>
		<Footer logo={<CodeXml />} />
	</div>
}
