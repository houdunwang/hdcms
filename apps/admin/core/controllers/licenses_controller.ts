import type { HttpContext } from '@adonisjs/core/http'

export default class LicensesController {
  /**
   * @handle
   * @tag 系统功能
   * @operationId license
   * @summary 授权验证
   * @description 校验授权是否有效
   */
  async handle({}: HttpContext) {
    return {
      status: true,
      message: 'license validate success',
    }
  }
}
