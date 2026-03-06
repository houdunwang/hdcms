import { Button } from '@/components/ui/button'
import { LoginRightSpace } from '@houdunyun/react'
import { AuthLayout } from '@houdunyun/react/auth'
import { Footer, Header } from '@houdunyun/react/components'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { CodeXml } from 'lucide-react'

export const Route = createFileRoute('/auth/')({
	beforeLoad: ({ context }) => {
		if (context.auth.isAuthenticated) {
			throw redirect({ to: '/' })
		}
	},
	component: RouteComponent,
})

function RouteComponent() {
	return <div className=''>
		<Header menu={<h1>ok</h1>} />

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
