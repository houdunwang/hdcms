import { fieldContext, formContext } from "@/form"
import { FieldCode } from "@/form/FieldCode"
import { FieldInput } from "@/form/FieldInput"
import { FieldSubmitButton } from "@/form/FieldSubmitButton"
import { FieldSwitch } from "@/form/FieldSwitch"
import { FieldTextarea } from "@/form/FieldTextarea"
import { createFormHook } from "@tanstack/react-form"

type IFieldComponents = Parameters<typeof createFormHook>[0]['fieldComponents']

export const hdCreateFormHook: (components?: IFieldComponents) => ReturnType<typeof createFormHook<
	{ FieldInput: typeof FieldInput; FieldCode: typeof FieldCode, FieldSwitch: typeof FieldSwitch, FieldTextarea: typeof FieldTextarea },
	{ FieldSubmitButton: typeof FieldSubmitButton, }
>> = (components: IFieldComponents = {}) => createFormHook({
	fieldComponents: {
		FieldInput,
		FieldCode,
		FieldTextarea,
		FieldSwitch,
		...components
	},
	formComponents: {
		FieldSubmitButton
	},
	fieldContext,
	formContext
})
