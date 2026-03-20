/**
 * 作者: 向军大叔
 * 邮箱: 2300071698@qq.com
 * 直播: 抖音、B站 搜索 后盾云
 */
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class AdminPolicy extends BasePolicy {
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
	 * 判断是否具有管理员权限
	 * @param user 当前登录用户
	 * @returns 是否为管理员（管理员返回 true）
	 */
	handle(user: User): AuthorizerResponse {
		return user.isAdmin
	}
}
