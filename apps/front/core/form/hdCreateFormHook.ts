import { fieldContext, formContext } from "."
import { FieldCode } from "./FieldCode"
import { FieldInput } from "./FieldInput"
import { FieldSubmitButton } from "./FieldSubmitButton"
import { FieldSwitch } from "./FieldSwitch"
import { FieldTextarea } from "./FieldTextarea"
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
