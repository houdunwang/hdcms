import { FieldCaptcha, FieldImage } from '#core/form';
import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from ".";
import { FieldCode } from "./FieldCode";
import { FieldInput } from "./FieldInput";
import { FieldRadioGroup } from './FieldRadioGroup';
import { FieldSubmitButton } from "./FieldSubmitButton";
import { FieldSwitch } from "./FieldSwitch";
import { FieldTextarea } from "./FieldTextarea";

type IFieldComponents = Parameters<typeof createFormHook>[0]['fieldComponents']

export const hdCreateFormHook: (components?: IFieldComponents) => ReturnType<typeof createFormHook<
	{
		FieldInput: typeof FieldInput,
		FieldCode: typeof FieldCode,
		FieldSwitch: typeof FieldSwitch,
		FieldTextarea: typeof FieldTextarea,
		FieldCaptcha: typeof FieldCaptcha
		FieldRadioGroup: typeof FieldRadioGroup
		FieldImage: typeof FieldImage
	},
	{ FieldSubmitButton: typeof FieldSubmitButton }
>> = (components: IFieldComponents = {}) => createFormHook({
	fieldComponents: {
		FieldInput,
		FieldCode,
		FieldTextarea,
		FieldSwitch,
		FieldCaptcha,
		FieldRadioGroup,
		FieldImage,
		...components
	},
	formComponents: {
		FieldSubmitButton
	},
	fieldContext,
	formContext
})
