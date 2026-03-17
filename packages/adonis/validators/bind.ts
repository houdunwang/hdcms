import vine from '@vinejs/vine'
import { validateProvider } from './config/validateProvider.ts'
import { emailCodeRule } from './rules/emailCodeRule.ts'

export const bindEmailValidator = vine.create(
  vine.object({
    email: vine
      .string()
      .email()
      .unique(async (db, value, field) => {
        if (value == field.meta.user.email) return true
        const isExists = await db.from('users').where('email', value).first()
        return !isExists
      }),
    code: vine.string().use(emailCodeRule()),
  })
)
bindEmailValidator.messagesProvider = validateProvider({
  messages: {
    'email.unique': '邮箱已经被使用',
  },
  fields: {
    email: '邮箱',
    code: '验证码',
  },
})

export const bindMobileValidator = vine.create(
  vine.object({
    mobile: vine
      .string()
      .regex(/^1[3-9]\d{9}$/)
      .unique(async (db, value, field) => {
        if (value == field.meta.user.mobile) return true
        const isExists = await db.from('users').where('mobile', value).first()
        return !isExists
      }),
    code: vine.string().use(emailCodeRule()),
  })
)
bindMobileValidator.messagesProvider = validateProvider({
  messages: {
    'mobile.unique': '手机号已经被使用',
  },
  fields: {
    mobile: '手机号',
    code: '验证码',
  },
})
