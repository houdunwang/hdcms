import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class PackagePolicy extends BasePolicy {
	before(user: User | null) {
		if (user && user.isAdmin) return true
	}

	show(user: User): AuthorizerResponse {
		return user.isAdmin
	}

	update(user: User): AuthorizerResponse {
		return user.isAdmin
	}

	store(user: User): AuthorizerResponse {
		return user.isAdmin
	}
}