
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class BindPolicy extends BasePolicy {
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
	 * 绑定邮箱的权限判断
	 * 仅允许用户操作自身账号的邮箱绑定
	 * @param user 当前登录用户
	 * @param model 目标用户模型（被操作对象）
	 * @returns 是否允许绑定（当前用户与目标用户为同一人返回 true）
	 */
	email(user: User, model: User): AuthorizerResponse {
		return user.id === model.id
	}

	/**
	 * 绑定手机号的权限判断
	 * 仅允许用户操作自身账号的手机号绑定
	 * @param user 当前登录用户
	 * @param model 目标用户模型（被操作对象）
	 * @returns 是否允许绑定（当前用户与目标用户为同一人返回 true）
	 */
	mobile(user: User, model: User): AuthorizerResponse {
		return user.id === model.id
	}
}
