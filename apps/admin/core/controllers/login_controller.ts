// import type { HttpContext } from '@adonisjs/core/http'
import { emailLoginValidator, mobileLoginValidator, nameLoginValidator } from '#core/validators/login'
import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { HttpContext } from '@adonisjs/core/http'
export default class LoginController {
	/**
		* @login
		* @operationId login
		* @tag 用户登录
		* @summary 用户登录
		* @description 用户登录
		* @requestFormDataBody { "account": { "type": "string", "description": "登录帐号、手机号、邮箱", "example": "admin", "required": "true" }, "password": { "type": "string", "description": "登录密码", "example": "admin888", "required": "true" } , "captcha": { "type": "string", "description": "验证码", "example": "" }, "captcha_key": { "type": "string", "description": "验证码key", "example": "" }}
		* @responseBody 200 - { "token":"string", "user": "User" }
		*/
	async name({ request, serialize, auth }: HttpContext) {
		const payload = await request.validateUsing(nameLoginValidator)
		const user = await User.findByOrFail('name', payload.name)
		await auth.use('web').login(user)
		const token = await User.accessTokens.create(user)
		return serialize({
			user: UserTransformer.transform(user, auth),
			token: token.value!.release(),
		})
	}

	async mobile({ request, serialize, auth }: HttpContext) {
		const payload = await request.validateUsing(mobileLoginValidator)
		const user = await User.findByOrFail('mobile', payload.mobile)
		await auth.use('web').login(user)
		const token = await User.accessTokens.create(user)
		return serialize({
			user: UserTransformer.transform(user, auth),
			token: token.value!.release(),
		})
	}


	async email({ request, serialize, auth }: HttpContext) {
		const payload = await request.validateUsing(emailLoginValidator)
		const user = await User.findByOrFail('email', payload.email)
		await auth.use('web').login(user)
		const token = await User.accessTokens.create(user)
		return serialize({
			user: UserTransformer.transform(user, auth),
			token: token.value!.release(),
		})
	}
}

