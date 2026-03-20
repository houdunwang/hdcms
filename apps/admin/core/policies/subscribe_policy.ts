import Subscribe from '#core/models/subscribe'
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class SubscribePolicy extends BasePolicy {
	before(user: User | null) {
		if (user && user.isAdmin) return true
	}

	show(user: User, model: Subscribe): AuthorizerResponse {
		return user.id == model.userId
	}
}