import { Image } from "#core/common/Image.tsx"
import type { Data } from '@app/admin/data'
import { type ComponentProps, type FC } from 'react'

export const UserIcon: FC<ComponentProps<'img'> & { user: Data.User }> = ({ user, className, ...props }) => {
	const fallback = user.sex ? '/avatar/boy.jpeg' : '/avatar/girl.jpeg'
	const src = user.avatar || fallback
	return (
		<Image
			src={src}
			fallback={<img src={fallback} className={className} />}
			className={className}
			{...props}
		/>
		// <Img
		// 	className={className}
		// 	src={user.avatar || fallback}
		// 	unloader={<img src={fallback} className={className} />}
		// 	loader={<div className="flex justify-center items-center w-full h-full opacity-50"><Spinner /></div>}
		// 	{...props}
		// />
	)
}
