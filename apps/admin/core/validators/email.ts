import vine from "@vinejs/vine";
import { validateProvider } from "./config/validateProvider.ts";

export const testEmailValidate = vine.create(
	vine.object({
		email: vine.string().email(),
	})
)

testEmailValidate.messagesProvider = validateProvider({
	messages: {
		'email.email': '请输入正确的邮箱格式',
	},
})