import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class EmailPolicy extends BasePolicy {

	/**
	 * 全局预检查
	 * 在其它策略方法执行前运行；若返回 true 则直接授权通过
	 * @param user 当前用户，未登录时为 null
	 * @returns 当用户为管理员时返回 true，其它情况不返回（继续走后续策略）
	 */
	before(user: User | null) {
		if (user && user.isAdmin) return true
	}

	/**
	 * 查看配置的权限判断
	 * @param user 当前登录用户
	 * @returns 是否允许查看（管理员返回 true）
	 */
	test(user: User): AuthorizerResponse {
		return user.isAdmin
	}
}