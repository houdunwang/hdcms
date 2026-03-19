// import { Spinner } from '../components/ui/spinner'
import { cn } from '@/lib/utils'
import { MoonLoader } from 'react-spinners'

export const Loading = ({ className, screen = false }: { className?: string, screen?: boolean }): React.JSX.Element => {
	return (
		<div className={cn("bg-r1d-500 min-h-32", { 'fixed z-50 inset-0 w-screen h-screen': screen }, className)} >
			<div className={cn('flex items-center justify-center h-full')}>
				{/* <Spinner className={cn('size-12', className)} /> */}
				<MoonLoader size={30} />
			</div>
		</div>
	)
}
