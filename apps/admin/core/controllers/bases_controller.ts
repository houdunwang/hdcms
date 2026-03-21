import type { HttpContext } from '@adonisjs/core/http'

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
