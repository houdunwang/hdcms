import { getUserByName } from '#core/helper'
import hash from '@adonisjs/core/services/hash'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { codeRule } from './rules/codeRule.js'
import env from '#start/env'
import { captchaRule } from './rules/captchaRule.js'
import { validateMessage } from './config/validateMessage.ts'
import { validateFields } from './config/validateFields.ts'
import { validateProvider } from './config/validateProvider.ts'

export const loginValidator = vine.create(
  vine.object({
    account: vine
      .string()
      .minLength(3)
      .maxLength(30)
      .exists(async (_db, value, field) => {
        const user = await getUserByName(value)
        if (user) {
          field.meta.user = user
          return true
        }
        return false
      }),
    password: vine
      .string()
      .minLength(5)
      .maxLength(30)
      .exists(async (_db, value, field) => {
        const user = field.meta.user
        if (user) {
          return await hash.verify(user.password || '', value)
        }
        return true
      }),
    captcha: vine
      .string()
      .optional()
      .requiredWhen(() => {
        return env.get('NODE_ENV') !== 'development'
      })
      .use(captchaRule()),
  })
).messagesProvider = validateProvider({
  messages: {
    'password.database.exists': '密码错误',
  }
})

export const registerValidator = vine.create(
  vine.object({
    name: vine
      .string()
      .minLength(3)
      .maxLength(20)
      .unique(async (db, value, _field) => {
        const user = await db.from('users').where('name', value).first()
        return !user
      }),
    password: vine.string().minLength(5).maxLength(20).confirmed(),
    password_confirmation: vine.string().minLength(5).maxLength(20),
    captcha: vine.string().use(captchaRule()),
  })
).messagesProvider = validateProvider({
  fields: {
    name: '帐号',
  }
})


export const findPasswordValidator = vine.create(
  vine.object({
    account: vine
      .string()
      .minLength(3)
      .maxLength(30)
      .exists(async (_db, value) => {
        return !!(await getUserByName(value))
      }),
    password: vine.string().minLength(5).maxLength(20).confirmed(),
    password_confirmation: vine.string().minLength(5).maxLength(20),
    code: vine.string().use(codeRule()),
  })
)
