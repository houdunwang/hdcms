import payConfig from '#config/pay'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'
import { validateFields, validateMessage } from './lang.js'

export const payValidator = vine.compile(
  vine.object({
    subject: vine.string().trim(),
    orderable_type: vine.enum(Object.keys(payConfig.process) as (keyof typeof payConfig.process)[]),
    orderable_id: vine.number(),
  })
)

const messageProvider = new SimpleMessagesProvider(
  {
    ...validateMessage,
    'orderable_type.enum': '订单类型不存在',
  },
  { ...validateFields, orderable_type: '订单类型' }
)
payValidator.messagesProvider = messageProvider

export type PayPayload = Infer<typeof payValidator>
