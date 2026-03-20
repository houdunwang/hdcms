import SystemPolicy from '#core/policies/system_policy'
import { type HttpContext } from '@adonisjs/core/http'

export default class SystemsController {
  /**
   * @restart
   * @tag 系统功能
   * @operationId restart
   * @summary 重起系统
   * @description 重启系统，所有正在运行的任务将被中断
   * @responseBody 200 - { "success": true, "message": "系统正在重启，请稍候..." }
   */
  async restart({ bouncer, response }: HttpContext) {
    await bouncer.with(SystemPolicy).authorize('restart')
    setTimeout(() => {
      process.exit(0)
    }, 1000)

    return response.ok({ message: '系统正在重启，请稍候...' })
  }
}
