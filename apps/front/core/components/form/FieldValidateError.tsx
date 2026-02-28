import type { IFieldApi } from "@core/types/form"
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

	useEffect(() => {
		const errors = field.state.meta?.errors as Array<{ message?: string }>
		const message = errors?.[0]?.message! as string
		setContent(message ?? requestError?.[name] ?? "")
	}, [field.state.meta?.errors[0], requestError])

	if (!content) {
		return null
	}

	return (
		<div className="bg-muted text-xs px-2 py-1 rounded-sm flex items-center gap-1">
			<MessageCircleWarning size={15} className="text-primary" />
			{content}
		</div>
	)
}
