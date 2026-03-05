import { FieldCode } from "@core/components/form/FieldCode"
import { FieldInput } from "@core/components/form/FieldInput"
import { FieldSubmitButton } from "@core/components/form/FieldSubmitButton"
import { fieldContext, formContext } from "@/index"
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
