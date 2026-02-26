import { fieldErrorStore } from "@/store/fieldErrorStore"
import { useStore } from "@tanstack/react-store"
import { useEffect, useImperativeHandle, useState, type Ref } from "react"
import { FieldError } from "../ui/field"
import { CircleAlert, Info, MessageCircleWarning } from "lucide-react"

type Props = {
	name: string
	error: string | undefined
	controlRef: Ref<FieldErrorHandle>
}

export type FieldErrorHandle = {
	clear: () => void
}
export const FormValidateError = ({ name, error, controlRef }: Props) => {
	const apiMessage = useStore(fieldErrorStore, s => (s.errors))
	const [content, setContent] = useState("")

	useEffect(() => {
		console.log('apiMessage', apiMessage?.[name])
		console.log('error', error)
		console.log(error ?? apiMessage?.[name] ?? "")
		setContent(error ?? apiMessage?.[name] ?? "")
	}, [name, error, apiMessage])

	useImperativeHandle(controlRef, () => ({
		clear: () => setContent("")
	}))

	useImperativeHandle(controlRef, () => ({
		clear: () => {
			setContent("")
		}
	}))

	if (!content) {
		return null
	}

	return (
		<div className="bg-muted text-xs px-2 py-1 rounded-sm flex items-center gap-1">
			<MessageCircleWarning size={15} />
			{content}
		</div>
	)
}
