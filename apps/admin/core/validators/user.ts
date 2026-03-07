import hash from '@adonisjs/core/services/hash'
import vine from '@vinejs/vine'
import { validateProvider } from './config/validateProvider.ts'
import { captchaRule } from './rules/captchaRule.js'

/**
 * Validator to validate the payload when creating
 * a new user.
 */
export const createUserValidator = vine.create(
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
)
createUserValidator.messagesProvider = validateProvider({
  fields: {
    name: '帐号',
  },
})

export const updateUserValidator = vine.create(
  vine.object({
    nickname: vine.string().optional(),
    address: vine.string().optional(),
    avatar: vine.string().optional(),
    realName: vine.string().optional(),
    home: vine.string().url().optional(),
    weibo: vine.string().optional(),
    wechat: vine.string().url().optional(),
    github: vine.string().url().optional(),
    qq: vine
      .string()
      .regex(/^[1-9]\d{4,10}$/)
      .optional(),
    isLock: vine.boolean().optional(),
  })
)
updateUserValidator.messagesProvider = validateProvider({
  messages: {
    'qq.regex': '请输入正确的 QQ 号',
  },
  fields: {
    nickname: '昵称',
  },
})

export const updatePasswordValidator = vine.create(
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
updatePasswordValidator.messagesProvider = validateProvider({
  messages: {
    'old_password.database.exists': '旧密码错误',
  },
})
