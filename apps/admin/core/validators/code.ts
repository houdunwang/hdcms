import vine from '@vinejs/vine'
import { validateProvider } from './config/validateProvider.ts'

export const sendEmailCodeValidator = vine.create(
  vine.object({
    email: vine.string().email().exists(async (db, value, field) => {
      if (!field.meta.isAuthenticated) {
        return !!(await db.from('users').where('email', value).first())
      }
      return true
    }),
  })
)

sendEmailCodeValidator.messagesProvider = validateProvider({
  messages: {
    'value.data.exists': '邮箱不存在',
  },
})

export const sendMobileCodeValidator = vine.create(
  vine.object({
    mobile: vine.string().exists(async (db, value, field) => {
      if (!field.meta.isAuthenticated) {
        return !!(await db.from('users').where('mobile', value).first())
      }
      return true
    })
      .regex(/^1[3-9]\d{9}$/),
  })
)

sendMobileCodeValidator.messagesProvider = validateProvider({
  messages: {
    'value.data.exists': '手机号不存在',
    'value.regex': '手机号格式错误',
  },
  fields: {
    mobile: '手机号',
  },
})
