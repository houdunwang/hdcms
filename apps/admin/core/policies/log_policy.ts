import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class LogPolicy extends BasePolicy {
	before(user: User | null) {
		if (user && user.isAdmin) return true
	}

	index(user: User): AuthorizerResponse {
		return user.isAdmin
	}
}