import hash from '@adonisjs/core/services/hash'
import vine from '@vinejs/vine'
import { validateProvider } from './config/validateProvider.ts'
import { captchaRule } from './rules/captchaRule.js'

/**
 * Validator to validate the payload when creating
 * a new user.
 */
export const createUserValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .minLength(3)
      .maxLength(20)
      .unique(async (db, value) => {
        const user = await db.from('users').where('name', value).first()
        return !user
      }),
    password: vine.string().minLength(5).maxLength(20).confirmed(),
    password_confirmation: vine.string(),
    captcha: vine.string().use(captchaRule()),
  })
).messagesProvider = validateProvider({
  fields: {
    name: '帐号',
  }
})



export const updateUserValidator = vine.create(
  vine.object({
    nickname: vine.string().optional(),
    address: vine.string().optional(),
    realName: vine.string().optional(),
    home: vine.string().url().optional(),
    weibo: vine.string().optional(),
    wechat: vine.string().url().optional(),
    github: vine.string().url().optional(),
    qq: vine.number().optional(),
    isLock: vine.boolean().optional(),
  })
)
updateUserValidator.messagesProvider = validateProvider({
  fields: {
    nickname: '昵称',
  }
})

export const changePasswordValidator = vine.create(
  vine.object({
    old_password: vine.string().exists(async (_db, value, field) => {
      const user = field.meta.user
      if (user) {
        return await hash.verify(user.password, value)
      }
      return false
    }),
    password: vine.string().minLength(5).maxLength(20).confirmed(),
    password_confirmation: vine.string(),
    captcha: vine.string().use(captchaRule()),
  })
)
