import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class UploadPolicy extends BasePolicy {
	before(user: User | null) {
		if (user && user.isAdmin) return true
	}

	file(user: User): AuthorizerResponse {
		return Boolean(user.id)
	}

	image(user: User): AuthorizerResponse {
		return Boolean(user.id)
	}
}