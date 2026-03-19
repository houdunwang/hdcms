import { cn } from "@/lib/utils"
import { type ComponentProps, type FC, type PropsWithChildren } from "react"

type Props = ComponentProps<'div'> & PropsWithChildren<{}>

export const FrontLayout: FC<Props> = ({ children, className }) => {
	return (
		<div className={cn('container mx-auto mt-12 min-h-[calc(100vh-var(--header-height))]', className)}>
			{children}
		</div>
	)
}
