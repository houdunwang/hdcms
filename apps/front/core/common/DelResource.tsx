import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { Trash2, Trash2Icon } from 'lucide-react'
import { type FC } from 'react'

type Props = {
	title?: string,
	description?: string,
	onSuccess: () => void
	buttonText?: string
}

export const DelResource: FC<Props> = ({ onSuccess, title = '确定删除吗？', description = '删除后将无法恢复', buttonText }) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline" >
					<Trash2 /> {buttonText ?? '删除'}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent size="sm">
				<AlertDialogHeader>
					<AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
						<Trash2Icon />
					</AlertDialogMedia>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel variant="outline">取消</AlertDialogCancel>
					<AlertDialogAction variant="destructive" onClick={onSuccess}>删除</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
