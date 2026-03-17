import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import type React from "react"

interface Props {
	children: React.ReactNode
	title: string
	description: string
	onConfirm?: () => void
	submitButton?: React.ReactNode
}
export function ConfirmDialog({ title, description, submitButton, onConfirm = () => { }, children }: Props): React.JSX.Element {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				{children}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>取消</AlertDialogCancel>
					{submitButton ? submitButton :
						<AlertDialogAction onClick={onConfirm}>确定</AlertDialogAction>}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
