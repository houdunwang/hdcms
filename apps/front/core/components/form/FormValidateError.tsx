import { useStore } from "@tanstack/react-store"
import { fieldErrorAtom } from "core/store/fieldErrorStore"
import { useAtomValue } from "jotai"
import { MessageCircleWarning } from "lucide-react"
import { useEffect, useImperativeHandle, useState, type Ref } from "react"

type Props = {
	name: string
	error: string | undefined
	controlRef: Ref<FieldErrorHandle>
}

export type FieldErrorHandle = {
	clear: () => void
}
export const FormValidateError = ({ name, error, controlRef }: Props) => {
	const requestError = useAtomValue(fieldErrorAtom)
	const [content, setContent] = useState("")

	useEffect(() => {
		setContent(error ?? requestError?.[name] ?? "")
	}, [name, error, requestError])

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
