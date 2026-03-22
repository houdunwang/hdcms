import { Spinner } from '#/components/ui/spinner'
import { cn } from '#/lib/utils'
import type { ComponentProps, FC, ReactNode } from 'react'
import { Img } from 'react-image'

type Props = ComponentProps<'img'> & {
	src: string
	fallback?: ReactNode
	imgClassName?: string
}
export const Image: FC<Props> = ({ src, fallback, className, imgClassName }) => {
	return (
		<div className={cn('overflow-hidden', className)}>
			<Img
				className={cn('object-cover w-full h-full', imgClassName)}
				src={src}
				unloader={fallback || <img src='/nopic160x160.jpg' className='w-full h-full' />}
				loader={<div className="flex justify-center items-center w-full h-full opacity-50"><Spinner /></div>}
			/>
		</div>
	)
}
