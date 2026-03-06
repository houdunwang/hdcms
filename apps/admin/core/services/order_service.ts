import Order from "#core/models/order"
import { payValidator } from "#core/validators/pay"
import { inject } from "@adonisjs/core"
import { HttpContext } from "@adonisjs/core/http"
import { Infer } from '@vinejs/vine/types'

/**
 * 订单服务类，处理与订单相关的业务逻辑
 */
@inject()
export class OrderService {
  /**
   * @param ctx HTTP 上下文
   */
  constructor(protected ctx: HttpContext) {

  }
  /**
   * 创建新订单
   * @param data 订单数据，包含支付验证器推断的类型和价格
   * @returns 创建的订单对象
   */
  async create(data: Infer<typeof payValidator> & { price: number }) {
    const sn = await this.generateOrderSn()
    const order = await Order.create({
      ...data,
      sn,
      userId: this.ctx.auth.user!.id,
    })
    return order
  }

  /**
   * 生成唯一的订单号
   * 格式为 'U' + 用户ID + '-' + 时间戳
   * @returns 订单号字符串
   */
  async generateOrderSn() {
    const sn = 'U' + this.ctx.auth.user?.id + '-' + Date.now()
    return sn
  }

  /**
   * 根据订单号获取订单
   * @param sn 订单号
   * @returns 订单对象
   * @throws 如果找不到订单，则抛出异常
   */
  async getOrderBySn(sn: string) {
    const order = await Order.query()
      .where('sn', sn)
      .firstOrFail()
    return order
  }
}