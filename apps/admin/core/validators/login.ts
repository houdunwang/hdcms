import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import vine from '@vinejs/vine'
import { validateProvider } from './config/validateProvider.ts'
import { captchaRule } from './rules/captchaRule.js'


export const nameLoginValidator = vine.create(
	vine.object({
		name: vine.string().minLength(3).maxLength(30).exists(async (_db, value, field) => {
			const user = await User.findBy('name', value)
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
nameLoginValidator.messagesProvider = validateProvider({
	messages: {
		'password.database.exists': '密码错误',
	},
})

export const emailLoginValidator = vine.create(
	vine.object({
		email: vine.string().email().exists(async (_db, value, field) => {
			const user = await User.findBy('email', value)
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
emailLoginValidator.messagesProvider = validateProvider({
	messages: {
		'password.database.exists': '密码错误',
	},
})

export const mobileLoginValidator = vine.create(
	vine.object({
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
mobileLoginValidator.messagesProvider = validateProvider({
	messages: {
		'password.database.exists': '密码错误',
	},
})