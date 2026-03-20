import type { HttpContext } from '@adonisjs/core/http'
/**
 * 作者: 向军大叔
 * 邮箱: 2300071698@qq.com
 * 直播: 抖音、B站 搜索 后盾云
 */
export default abstract class BaseController {
  protected abstract ctx: HttpContext
  // constructor(protected ctx: HttpContext) { }

  success<T>(message = '操作成功', data?: T) {
    return this.ctx.serialize({ message, data })
  }

  error(message = '操作失败', status = 400) {
    return this.ctx.response.abort({ errors: [{ message }] }, status)
  }
}
