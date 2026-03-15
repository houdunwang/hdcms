import { cn } from "@/lib/utils"
import type { IFieldApi } from "@/form/types"
import { useStore } from "@tanstack/react-form"
import { fieldErrorAtom } from "@/store/fieldErrorStore"
import { useAtom } from "jotai"
import { MessageCircleWarning } from "lucide-react"
import { useEffect, useState } from "react"

type Props = {
	field: IFieldApi
	className?: string
}

export const FieldValidateError = ({ field, className }: Props): React.JSX.Element | null => {
	const { name } = field
	const [requestError, setRequestError] = useAtom(fieldErrorAtom)
	const [content, setContent] = useState("")
	const value = useStore(field.form.store, state => state.values[name])
	useEffect(() => {
		const errors = field.state.meta?.errors as Array<{ message?: string }>
		const message = errors?.[0]?.message as string
		setContent(message ?? requestError?.[name] ?? "")
	}, [field.state.meta?.errors[0], requestError])
	useEffect(() => {
		if (value) {
			setRequestError({ ...requestError, [name]: "" })
		}
	}, [value])
	if (!content) {
		return null
	}

	return (
		<div className={cn("bg-destructive/2 text-xs text-primary/90 px-2 py-2 rounded-sm flex items-center gap-1 border border-destructive/5", className)}>
			<MessageCircleWarning size={12} className="text-primary/50" />
			{content}
		</div>
	)
}
