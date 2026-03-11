import { createFormHookContexts } from '@tanstack/react-form'
const contexts: ReturnType<typeof createFormHookContexts> = createFormHookContexts()
export const fieldContext: typeof contexts.fieldContext = contexts.fieldContext
export const formContext: typeof contexts.formContext = contexts.formContext
export const useFieldContext: typeof contexts.useFieldContext = contexts.useFieldContext
export const useFormContext: typeof contexts.useFormContext = contexts.useFormContext
export * from './FieldCaptcha'
export * from './FieldCode'
export * from './FieldImage'
export * from './FieldInput'
export * from './FieldSubmitButton'
export * from './FieldValidateError'
export * from './SendCodeButton'
export * from './types'
