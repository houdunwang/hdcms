import { Card, CardContent } from '@/components/ui/card'
import type React from 'react'
interface Props extends React.ComponentProps<'div'> {
	children: React.ReactNode
	introduce?: React.ReactNode
	description?: string
}
export const Layout = ({ children, introduce }: Props) => {
	return <section className="container mx-auto mt-20">
		<div className="grid items-start content-center pb-16 gap-10 lg:grid-cols-[auto_1fr]">
			<Card className="lg:justify-self-end w-full lg:max-w-md bg-muted">
				<CardContent>
					{children}
					<Card size="sm" className="mt-4">
						<CardContent className="text-xs text-muted-foreground">
							登录网站即可解锁系统课、实战项目与学习资料，加入后还能获得学习记录与更新提醒。
						</CardContent>
					</Card>
				</CardContent>
			</Card>
			{introduce}
		</div>
	</section>
}
