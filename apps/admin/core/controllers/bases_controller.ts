import type { HttpContext } from '@adonisjs/core/http'

export default abstract class BaseController {
  protected abstract ctx: HttpContext
  // constructor(protected ctx: HttpContext) { }

  success(message: string, data: Record<string, any> = {}) {
    return this.ctx.response.ok({ success: true, message, data })
  }

  error(message: string, data: Record<string, any> = {}, status = 400) {
    return this.ctx.response.abort({ success: false, error: message, data }, status)
  }
}
