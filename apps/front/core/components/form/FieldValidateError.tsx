import type { IFieldApi } from "@core/types/form"
import { useStore } from "@tanstack/react-form"
import { fieldErrorAtom } from "core/store/fieldErrorStore"
import { useAtomValue } from "jotai"
import { MessageCircleWarning } from "lucide-react"
import { useEffect, useState } from "react"

type Props = {
	field: IFieldApi
}

export const FieldValidateError = ({ field }: Props) => {
	const { name } = field
	const requestError = useAtomValue(fieldErrorAtom)
	const [content, setContent] = useState("")
	const value = useStore(field.form.store, state => state.values[name])
	useEffect(() => {
		const errors = field.state.meta?.errors as Array<{ message?: string }>
		const message = errors?.[0]?.message! as string
		setContent(message ?? requestError?.[name] ?? "")
	}, [field.state.meta?.errors[0], requestError])
	useEffect(() => {
		if (value) {
			setContent("")
		}
	}, [value])
	if (!content) {
		return null
	}

	return (
		<div className="bg-primary/3 text-xs px-2 py-2 rounded-sm flex items-center gap-1 border border-primary/6">
			<MessageCircleWarning size={12} className="text-primary/50" />
			{content}
		</div>
	)
}
