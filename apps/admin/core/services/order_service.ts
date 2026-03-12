import Order from '#core/models/order'
import { payValidator } from '#core/validators/pay'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { Infer } from '@vinejs/vine/types'
import { DateTime } from 'luxon'

/**
 * 订单服务类，处理与订单相关的业务逻辑
 */
@inject()
export class OrderService {
  /**
   * @param ctx HTTP 上下文
   */
  constructor(protected ctx: HttpContext) { }

  /**
   * 检查订单支付状态
   * @param sn 订单号
   * @returns 订单支付状态
   */
  async checkPaystatus(sn: string) {
    const order = await this.getOrderBySn(sn)
    return order.payState
  }

  /**
   * 创建新订单
   * @param data 订单数据，包含支付验证器推断的类型和价格
   * @returns 创建的订单对象
   */
  async create(data: Infer<typeof payValidator> & { price: string }) {
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
    const order = await Order.query().where('sn', sn).firstOrFail()
    return order
  }

  /**
   * 获取指定月份前的订单统计数据
   * @param prevMonths  previous months to include in the statistics, default is 11
   * @returns 包含月份、订单数量和金额的数组
   */
  async getOrderStatsByMonth(prevMonths: number = 11) {
    const now = DateTime.now()
    const from = now.minus({ months: prevMonths }).startOf('month')
    const rows: Array<{ ym: string; count: number; amount: string | number | null }> =
      await db
        .from('orders')
        .where('created_at', '>=', from.toSQL({ includeOffset: false })!)
        .where('pay_state', true)
        .select(db.raw('DATE_FORMAT(created_at, "%Y-%m") as ym'))
        .select(db.raw('COUNT(*) as count'))
        .select(db.raw('SUM(price) as amount'))
        .groupBy('ym')

    const months: Array<{ month: string; count: number; amount: number }> = []
    for (let i = prevMonths; i >= 0; i--) {
      const label = now.minus({ months: i }).toFormat('yyyy-LL')
      const r = rows.find((x) => x.ym === label)
      const amt =
        r && r.amount !== null ? typeof r.amount === 'string' ? parseFloat(r.amount) : r.amount : 0
      months.push({ month: label, count: r ? Number(r.count) : 0, amount: isNaN(amt as number) ? 0 : (amt as number) })
    }
    return months
  }

  /**
   * 根据参数天数获取指定天数内的销售额
   * @param days 天数
   * @returns 销售额数组
   */
  async getDaySales(days = 7) {
    const now = DateTime.now()
    const from = now.startOf('day').minus({ days })
    const rows: Array<{ ymd: string; amount: string | number | null }> = await db
      .from('orders')
      .select(db.raw('DATE_FORMAT(created_at, "%Y-%m-%d") as ymd'))
      .where('created_at', '>=', from.toSQL({ includeOffset: false })!)
      .where('pay_state', true)
      .groupBy('ymd')
      .sum('price as amount')
      .orderBy('ymd', 'asc')
    const daysSales: Array<{ day: string; amount: number }> = []
    for (let i = days; i >= 0; i--) {
      const label = now.minus({ days: i }).toFormat('yyyy-LL-dd')
      const r = rows.find((x) => x.ymd === label)
      const amt =
        r && r.amount !== null ? (typeof r.amount === 'string' ? parseFloat(r.amount) : r.amount) : 0
      daysSales.push({ day: label, amount: isNaN(amt as number) ? 0 : (amt as number) })
    }
    return daysSales
  }

}
