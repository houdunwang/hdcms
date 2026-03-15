import Order from '#core/models/order'
import OrderTransformer from '#transformers/order_transformer'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OrdersController {
  constructor(protected ctx: HttpContext) {}

  /**
   * @index
   * @tag 订单管理
   * @summary 创建订单
   * @operationId createOrder
   * @description 创建订单
   * @requestFormDataBody { "subject": { "type": "string", "required": "true","example": "测试订单" }, "price": { "type": "number", "required": "true","example": "1" } }
   * @responseBody 200 - { "token":{"type": "string", "token": "string"}, "user": "<User>" }
   */
  async index({ request, serialize }: HttpContext) {
    const field = request.input('field')
    const keyword = request.input('keyword')
    const page = request.input('page', 1)
    const db = Order.query().preload('user')
    if (keyword) {
      if (field === 'userId') {
        db.where('user_id', Number(keyword))
      } else {
        db.where(field, 'like', `%${keyword}%`)
      }
      const orders = await db.paginate(page)
      return serialize(OrderTransformer.paginate(orders, orders.getMeta()))
    }
    const orders = await db.paginate(page)
    return serialize(OrderTransformer.paginate(orders, orders.getMeta()))
  }
}
