
import { FormValidateError, type FieldErrorHandle } from "core/components/form/FormValidateError"
import { useFieldContext } from "@/routes/__root"
import { useRef } from "react"

export function useFormField() {
	const field = useFieldContext<string>()
	const errors = normalizeErrors(field.state.meta?.errors)
	const hasError = errors.length > 0
	const errorComponentRef = useRef<FieldErrorHandle>(null)
	const error = errors[0]?.message || undefined
	return {
		normalizeErrors,
		hasError,
		errors,
		FieldErrorComponent: <FormValidateError error={error} name={field.name} controlRef={errorComponentRef} />,
		errorComponentRef,
	}
}

function normalizeErrors(errors: Array<unknown> | undefined) {
	if (!errors?.length) {
		return []
	}

	return errors
		.map((error) => {
			if (!error) return undefined

			if (typeof error === "string") return { message: error }

			if (typeof error === "object" && "message" in error) {
				const message = (error as { message?: unknown }).message
				if (message) {
					return { message: String(message) }
				}
			}

			return { message: String(error) }
		})
		.filter(Boolean)
}
