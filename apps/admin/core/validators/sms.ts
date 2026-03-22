import { validateProvider } from '#core/validators/config/validateProvider'
import vine from '@vinejs/vine'

export const testSmsValidate = vine.create(
	vine.object({
		mobile: vine.string().regex(/^1[3456789]\d{9}$/),
	})
)

testSmsValidate.messagesProvider = validateProvider({
	messages: {
		'mobile.regex': '请输入正确的手机号',
	},
})