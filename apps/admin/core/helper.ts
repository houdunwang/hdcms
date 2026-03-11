import User from '#models/user'
import env from '#start/env'
import router from '@adonisjs/core/services/router'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

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

/**
 * 获取文件所在目录的绝对路径
 * @param url 文件 URL 使用 import.meta.url 获得
 * @returns 目录路径
 */
export function currentDirectory(url: string) {
  const __filename = fileURLToPath(url);
  return dirname(__filename);
}
