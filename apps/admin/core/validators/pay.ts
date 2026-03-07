import payConfig from '#config/pay'
import vine from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'
import { validateProvider } from './config/validateProvider.ts'

export const payValidator = vine.create(
  vine.object({
    subject: vine.string().trim(),
    orderable_type: vine.enum(Object.keys(payConfig.process) as (keyof typeof payConfig.process)[]),
    orderable_id: vine.number(),
  })
)
payValidator.messagesProvider = validateProvider({
  messages: {
    'orderable_type.enum': '订单类型不存在',
  },
})

export type PayPayload = Infer<typeof payValidator>

export const payCheckValidator = vine.create(
  vine.object({
    sn: vine.string().trim(),
  })
)

payCheckValidator.messagesProvider = validateProvider({
  fields: {
    sn: '订单号',
  },
})
