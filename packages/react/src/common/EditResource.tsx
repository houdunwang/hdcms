import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { SquarePen } from 'lucide-react'
import { useState, type FC } from 'react'

export const EditResource: FC<{
	id: number,
	title?: string,
	description?: string,
	children: (props: { id: number, closeDialog: () => void }) => React.ReactNode
}> = ({ id, title, description, children }) => {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button variant="outline" size={'sm'} onClick={() => setOpen(true)}>
				<SquarePen />编辑
			</Button>
			<Dialog onOpenChange={setOpen} open={open}>
				<DialogTrigger> </DialogTrigger>
				<DialogContent className='lg:min-w-xl'
					onPointerDownOutside={(e) => {
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
			</Dialog>
		</>
	)
}
