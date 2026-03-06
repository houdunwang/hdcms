import { FieldCode } from "@core/form/FieldCode"
import { FieldInput } from "@core/form/FieldInput"
import { FieldSubmitButton } from "@core/form/FieldSubmitButton"
import { fieldContext, formContext } from "@core/form"
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
