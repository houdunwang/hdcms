import User from '#models/user'
import env from '#start/env'
import router from '@adonisjs/core/services/router'

/**
 * 根据用户名、邮箱或手机号查找用户
 * @param value 用户名、邮箱或手机号
 * @returns
 */
export async function getUserByName(value?: string | null) {
  if (!value) {
    return null
  }
  return await User.query()
    .where('name', value)
    .orWhere('email', value)
    .orWhere('mobile', value)
    .first()
}

/**
 * 生成应用的完整 URL
 * @param as 路由别名或 URL 路径
 * @param type 类型，'route' 表示路由别名，'const' 表示常量路径
 * @returns
 */
export function url(as: string, type: 'route' | 'const' = 'route') {
  if (type === 'const') {
    return env.get('APP_URL')! + as
  }
  return router.builder().prefixUrl(env.get('APP_URL')!).make(as)
}
