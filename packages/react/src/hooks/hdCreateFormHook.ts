import { FieldCode } from "@/form/FieldCode"
import { FieldInput } from "@/form/FieldInput"
import { FieldSubmitButton } from "@/form/FieldSubmitButton"
import { fieldContext, formContext } from "@/form"
import { createFormHook } from "@tanstack/react-form"

type IFieldComponents = Parameters<typeof createFormHook>[0]['fieldComponents']
export const hdCreateFormHook = (components: IFieldComponents = {}) => {
	return createFormHook({
		fieldComponents: {
			FieldInput,
			FieldCode,
			...components
		},
		formComponents: {
			FieldSubmitButton
		},
		fieldContext,
		formContext
	})
}
