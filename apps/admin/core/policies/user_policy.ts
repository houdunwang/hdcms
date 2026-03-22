
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class UserPolicy extends BasePolicy {
	/**
	 * 全局预检查
	 * 在其它策略方法执行前运行；若返回 true 则直接授权通过
	 * @param user 当前用户，未登录时为 null
	 * @returns 当用户为管理员时返回 true，其它情况不返回（继续走后续策略）
	 */
	before(user: User | null) {
		if (user && user.isAdmin) return true
	}

	profile(user: User, model: User): AuthorizerResponse {
		return user.id === model.id
	}

	index(user: User): AuthorizerResponse {
		console.log('user', user)
		return user.isAdmin
	}

	show(user: User): AuthorizerResponse {
		return !!user.id
	}

	/**
	 * 更新用户信息的权限判断
	 * 仅允许用户操作自身的资料更新
	 * @param user 当前登录用户
	 * @param model 目标用户模型（被操作对象）
	 * @returns 是否允许更新（当前用户与目标用户为同一人返回 true）
	 */
	update(user: User, model: User): AuthorizerResponse {
		return user.id === model.id
	}

	/**
	 * 删除用户的权限判断
	 * 仅允许用户删除自身账号
	 * @param user 当前登录用户
	 * @param targetUser 目标用户（被操作对象）
	 * @returns 是否允许删除（当前用户与目标用户为同一人返回 true）
	 */
	destroy(user: User, targetUser: User): AuthorizerResponse {
		return user.id === targetUser.id
	}

	/**
	 * 修改密码的权限判断
	 * 仅允许用户修改自身账号的密码
	 * @param user 当前登录用户
	 * @param targetUser 目标用户（被操作对象）
	 * @returns 是否允许修改（当前用户与目标用户为同一人返回 true）
	 */
	password(user: User, targetUser: User): AuthorizerResponse {
		return user.id === targetUser.id
	}
}
