import { getUserByName } from '#core/helper'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { validateMessage } from './lang.js'

export const sendCodeValidator = vine.compile(
  vine.object({
    account: vine.string().exists(async (_db, value, _field) => {
      return !!(await getUserByName(value))
    }),
  })
)

sendCodeValidator.messagesProvider = new SimpleMessagesProvider(validateMessage, {
  account: '账号',
})
