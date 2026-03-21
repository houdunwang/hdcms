import { getUserByName } from '#core/helper'
import env from '#start/env'
import hash from '@adonisjs/core/services/hash'
import vine from '@vinejs/vine'
import { validateProvider } from './config/validateProvider.ts'
import { captchaRule } from './rules/captchaRule.js'
import User from '#models/user'
export const loginValidator = vine.create(
  vine.object({
    name: vine.string().minLength(3).maxLength(30).exists(async (_db, value, field) => {
      const user = await User.findBy('name', value)
      if (user) {
        field.meta.user = user
        return true
      }
      return false
    }).optional(),
    email: vine.string().email().exists(async (_db, value, field) => {
      const user = await User.findBy('email', value)
      if (user) {
        field.meta.user = user
        return true
      }
      return false
    }).optional(),
    mobile: vine.string().regex(/^1[3-9]\d{9}$/).exists(async (_db, value, field) => {
      const user = await User.findBy('mobile', value)
      if (user) {
        field.meta.user = user
        return true
      }
      return false
    }).optional(),
    password: vine.string().minLength(5).maxLength(30).exists(async (_db, value, field) => {
      const user = field.meta.user
      if (user) {
        return await hash.verify(user.password || '', value)
      }
      return true
    }),
    captcha: vine.string().use(captchaRule()).optional()
  })
)
loginValidator.messagesProvider = validateProvider({
  messages: {
    'password.database.exists': '密码错误',
  },
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
)
registerValidator.messagesProvider = validateProvider({
  fields: {
    name: '帐号',
  },
})
