import vine from '@vinejs/vine'
import { validateProvider } from './config/validateProvider.ts'
import { codeRule } from './rules/codeRule.ts'

export const bindEmailValidator = vine.create(
	vine.object({
		account: vine.string().email().unique(async (db, value, field) => {
			if (value == field.meta.user.email) return true;
			const isExists = await db.from('users').where('email', value).first()
			return !isExists
		}),
		code: vine.string().use(codeRule()),
	})
)
bindEmailValidator.messagesProvider = validateProvider({
	messages: {
		'account.unique': '邮箱已经被使用',
	},
	fields: {
		account: '邮箱',
		code: '验证码',
	}
})