import Order from '#core/models/order'
import OrderTransformer from '#transformers/order_transformer'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OrdersController {
  constructor(protected ctx: HttpContext) { }

  /**
   * @index
   * @tag 订单管理
   * @summary 创建订单
   * @operationId createOrder
   * @description 创建订单
   * @requestFormDataBody { "subject": { "type": "string", "required": "true","example": "测试订单" }, "price": { "type": "number", "required": "true","example": "1" } }
   * @responseBody 200 - { "token":{"type": "string", "token": "string"}, "user": "<User>" }
   */
  async index(ctx: HttpContext) {
    const orders = await Order.query().preload('user').paginate(ctx.request.input('page', 1))
    return ctx.serialize(OrderTransformer.paginate(orders, orders.getMeta()))
  }
}
