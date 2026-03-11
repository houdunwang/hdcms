import { fieldContext, formContext } from "@/form"
import { FieldCode } from "@/form/FieldCode"
import { FieldInput } from "@/form/FieldInput"
import { FieldSubmitButton } from "@/form/FieldSubmitButton"
import { createFormHook } from "@tanstack/react-form"

type IFieldComponents = Parameters<typeof createFormHook>[0]['fieldComponents']
// export const hdCreateFormHook = (components: IFieldComponents = {}): any => {

export const hdCreateFormHook: (components?: IFieldComponents) => ReturnType<typeof createFormHook<
	{ FieldInput: typeof FieldInput; FieldCode: typeof FieldCode },
	{ FieldSubmitButton: typeof FieldSubmitButton }
>> = (components: IFieldComponents = {}) => createFormHook({
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
