import { validateFields, validateMessage } from '#core/validators/lang'
import env from '#start/env'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { captchaRule } from './rules/captchaRule.js'
import { codeRule } from './rules/codeRule.js'
import hash from '@adonisjs/core/services/hash'

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
    captcha: vine
      .string()
      .optional()
      .requiredWhen(() => {
        return env.get('NODE_ENV') !== 'development'
      })
      .use(captchaRule()),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing user.
 */
export const updateUserValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .minLength(3)
      .maxLength(20)
      .unique(async (db, value, field) => {
        const user = await db.from('users').where('name', value).whereNot('id', field.meta.userId).first()
        return !user
      })
      .optional(),
    nickname: vine.string().optional(),
    // sex: vine.number().optional(),
    address: vine.string().optional(),
    realName: vine.string().optional(),
    avatar: vine.string().optional(),
    home: vine.string().optional(),
    weibo: vine.string().optional(),
    wechat: vine.string().optional(),
    github: vine.string().optional(),
    qq: vine.string().optional(),
    isLock: vine.boolean().optional(),
  })
)

export const changePasswordValidator = vine.compile(
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
    code: vine.string().use(codeRule()),
  })
)

const messageProvider = new SimpleMessagesProvider(
  {
    ...validateMessage,
    'old_password.exists': '旧密码错误',
  },
  { ...validateFields, name: '帐号' }
)

createUserValidator.messagesProvider = messageProvider
updateUserValidator.messagesProvider = messageProvider
changePasswordValidator.messagesProvider = messageProvider