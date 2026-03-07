import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import BaseController from './bases_controller.js'

@inject()
export default class OrdersController extends BaseController {
  constructor(protected ctx: HttpContext) {
    super()
  }

  /**
   * @index
   * @tag 订单管理
   * @summary 创建订单
   * @operationId createOrder
   * @description 创建订单
   * @requestFormDataBody { "subject": { "type": "string", "required": "true","example": "测试订单" }, "price": { "type": "number", "required": "true","example": "1" } }
   * @responseBody 200 - { "token":{"type": "string", "token": "string"}, "user": "<User>" }
   */
  async index({}: HttpContext) {}
}
