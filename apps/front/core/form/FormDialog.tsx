import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogPortal, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import type { VariantProps } from 'class-variance-authority'
import { SquarePen, SquarePlus } from 'lucide-react'
import { useState, type FC } from 'react'

export const FormDialog: FC<{
	id?: number,
	button?: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	},
	buttonText?: string,
	title?: string,
	description?: string,
	children: (props: { id?: number, closeDialog: () => void }) => React.ReactNode
}> = ({ id, buttonText, title, description, children, button }) => {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button variant="outline" onClick={() => setOpen(true)} {...button}>
				{id ? <SquarePen /> : <SquarePlus />}
				{buttonText ?? title ?? (id ? '编辑' : '添加')}
			</Button>
			<Dialog onOpenChange={setOpen} open={open} modal={true}>
				<DialogTrigger asChild> </DialogTrigger>
				<DialogPortal container={document.body}>
					<DialogContent className='lg:min-w-xl'
						onPointerDownOutside={(e) => {
							e.preventDefault();
						}}
						onInteractOutside={(e) => {
							e.preventDefault();
						}}
						onCloseAutoFocus={(e) => {
							e.preventDefault();
						}}>
						<DialogHeader>
							<DialogTitle className='flex items-center gap-2'>
								{title && <><SquarePen size={16} />	{title}</>}
							</DialogTitle>
							<DialogDescription>
								{description}
							</DialogDescription>
						</DialogHeader>
						{children({ id, closeDialog: () => setOpen(false) })}
					</DialogContent>
				</DialogPortal>
			</Dialog>
		</>
	)
}
