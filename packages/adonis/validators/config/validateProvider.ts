import { SimpleMessagesProvider } from '@vinejs/vine'
import { validateMessage } from './validateMessage.ts'
import { validateFields } from './validateFields.ts'

type Params = { messages?: Record<string, any>; fields?: Record<string, any> }

export const validateProvider = ({ messages = {}, fields = {} }: Params) => {
  return new SimpleMessagesProvider(
    { ...validateMessage, ...messages },
    { ...validateFields, ...fields }
  )
}
