import vine from '@vinejs/vine'
import { codeRule } from './rules/codeRule.ts'
import { validateProvider } from './config/validateProvider.ts'
import { captchaRule } from './rules/captchaRule.ts'

export const findPasswordByEmailValidator = vine.create(
  vine.object({
    email: vine
      .string()
      .email()
      .exists(async (db, value) => {
        return !!(await db.from('users').where('email', value).first())
      }),
    password: vine.string().minLength(5).maxLength(20).confirmed(),
    password_confirmation: vine.string().minLength(5).maxLength(20),
    code: vine.string().optional().requiredIfExists('email').use(codeRule()),
    captcha: vine.string().use(captchaRule()),
  })
)
findPasswordByEmailValidator.messagesProvider = validateProvider({
  fields: {
    code: '验证码',
  }
})

export const findPasswordByMobileValidator = vine.create(
  vine.object({
    mobile: vine
      .string()
      .regex(/^1[3-9]\d{9}$/)
      .exists(async (db, value) => {
        return !!(await db.from('users').where('mobile', value).first())
      }),
    password: vine.string().minLength(5).maxLength(20).confirmed(),
    password_confirmation: vine.string().minLength(5).maxLength(20),
    code: vine.string().optional().requiredIfExists('mobile').use(codeRule()),
    captcha: vine.string().use(captchaRule()),
  })
)
findPasswordByMobileValidator.messagesProvider = validateProvider({
  fields: {
    code: '验证码',
  }
})