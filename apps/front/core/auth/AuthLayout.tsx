import { cn } from '@/lib/utils'
import type { ComponentProps, FC, PropsWithChildren } from 'react'

type Props = ComponentProps<'div'> & PropsWithChildren<{}>

export const AuthLayout: FC<Props> = (props) => {
	return <section className={cn("flex items-start", props.className)}>
		<div className={cn("container mx-auto content-center")}>
			{props.children}
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
