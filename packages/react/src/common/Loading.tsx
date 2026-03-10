// import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { MoonLoader } from 'react-spinners'

export const Loading = ({ className }: { className?: string }) => {
	return (
		<div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center ">
			<div className={cn('flex items-center justify-center ', className)} >
				{/* <Spinner className={cn('size-12', className)} /> */}
				<MoonLoader size={30} />
			</div>
		</div>
	)
}
