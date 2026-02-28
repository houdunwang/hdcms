import { Card, CardContent } from '@/components/ui/card'
import type React from 'react'
interface Props extends React.ComponentProps<'div'> {
	children: React.ReactNode
	introduce?: React.ReactNode
	description?: string
}
export const Layout = ({ children, introduce }: Props) => {
	return <section className="flex justify-center mt-12 lg:mt-28">
		<div className="container mx-auto grid items-start content-center gap-10 lg:grid-cols-[auto_1fr]">
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
		<GradientAnimation />
	</section>
}

const GradientAnimation = () => {
	return (
		<>
			<style>{`
            @keyframes blob {
                0% { transform: translate(0px, 0px) scale(1); }
                33% { transform: translate(30px, -50px) scale(1.1); }
                66% { transform: translate(-20px, 20px) scale(0.9); }
                100% { transform: translate(0px, 0px) scale(1); }
            }
            .animate-blob {
                animation: blob 3s infinite;
            }
            .animation-delay-2000 {
                animation-delay: 2s;
            }
            .animation-delay-4000 {
                animation-delay: 4s;
            }
        `}</style>
			<div className="fixed inset-0 -z-10 h-screen w-full overflow-hidden pointer-events-none">
				<div className="absolute bottom-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[100px] animate-blob" />
				<div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[100px] animate-blob animation-delay-2000" />
				<div className="absolute bottom-[-40%] left-[30%] h-[600px] w-[600px] rounded-full bg-pink-500/20 blur-[120px] animate-blob animation-delay-4000" />
			</div>
		</>
	)
}
