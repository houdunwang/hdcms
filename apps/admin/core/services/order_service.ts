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
   * 获取每年的订单统计数据
   * @param prevYears 返回的年份数量（包含当年），例如 3 表示返回最近 3 年
   * @returns 每年 { year, count, amount } 数组
   */
  async getOrderStatsByYear(prevYears: number) {
    const now = DateTime.now()
    const yearsToReturn = Math.max(1, prevYears)
    const startYear = now.year - (yearsToReturn - 1)
    const from = DateTime.fromObject({ year: startYear }).startOf('year')
    const to = now.endOf('year')
    const rows: Array<{ y: string; count: number | string; amount: string | number | null }> = await db
      .from('orders')
      .where('created_at', '>=', from.toSQL({ includeOffset: false })!)
      .where('created_at', '<=', to.toSQL({ includeOffset: false })!)
      .where('pay_state', true)
      .select(db.raw('DATE_FORMAT(created_at, "%Y") as y'))
      .select(db.raw('COUNT(*) as count'))
      .select(db.raw('SUM(price) as amount'))
      .groupBy('y')
    const years: Array<{ year: number; count: number; amount: number }> = []
    for (let y = startYear; y <= now.year; y++) {
      const label = String(y)
      const r = rows.find((x) => x.y === label)
      const amt =
        r && r.amount !== null
          ? typeof r.amount === 'string'
            ? Number.parseFloat(r.amount)
            : (r.amount as number)
          : 0
      years.push({
        year: y,
        count: r ? Number(r.count) : 0,
        amount: Number.isNaN(amt) ? 0 : amt,
      })
    }
    return years
  }

  /**
   * 获取指定月份前的订单统计数据
   * @param prevMonths  previous months to include in the statistics, default is 11
   * @returns 包含月份、订单数量和金额的数组
   */
  async getOrderStatsByMonth(prevMonths: number = 11) {
    const now = DateTime.now()
    const count = Math.max(1, prevMonths)
    const from = now.minus({ months: count - 1 }).startOf('month')
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
    for (let i = count - 1; i >= 0; i--) {
      const label = now.minus({ months: i }).toFormat('yyyy-LL')
      const r = rows.find((x) => x.ym === label)
      const amt =
        r && r.amount !== null ? (typeof r.amount === 'string' ? Number.parseFloat(r.amount) : r.amount) : 0
      months.push({ month: label, count: r ? Number(r.count) : 0, amount: Number.isNaN(amt as number) ? 0 : (amt as number) })
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
    const count = Math.max(1, days)
    const from = now.startOf('day').minus({ days: count - 1 })
    const rows: Array<{ ymd: string; amount: string | number | null }> = await db
      .from('orders')
      .select(db.raw('DATE_FORMAT(created_at, "%Y-%m-%d") as ymd'))
      .where('created_at', '>=', from.toSQL({ includeOffset: false })!)
      .where('pay_state', true)
      .groupBy('ymd')
      .sum('price as amount')
      .orderBy('ymd', 'asc')
    const daysSales: Array<{ day: string; amount: number }> = []
    for (let i = count - 1; i >= 0; i--) {
      const label = now.minus({ days: i }).toFormat('yyyy-LL-dd')
      const r = rows.find((x) => x.ymd === label)
      const amt =
        r && r.amount !== null ? (typeof r.amount === 'string' ? Number.parseFloat(r.amount) : r.amount) : 0
      daysSales.push({ day: label, amount: Number.isNaN(amt as number) ? 0 : (amt as number) })
    }
    return daysSales
  }

  /**
   * 获取本周销售额
   * @returns 本周销售额
   */
  async getWeekSales() {
    const now = DateTime.now()
    const from = now.startOf('week').startOf('day')
    const to = now.endOf('week').endOf('day')
    const rows: Array<{ amount: string | number | null }> = await db
      .from('orders')
      .select(db.raw('SUM(price) as amount'))
      .where('created_at', '>=', from.toSQL({ includeOffset: false })!)
      .where('created_at', '<=', to.toSQL({ includeOffset: false })!)
      .where('pay_state', true)
    const amount =
      rows[0] && rows[0].amount !== null
        ? typeof rows[0].amount === 'string'
          ? Number.parseFloat(rows[0].amount)
          : rows[0].amount
        : 0
    return Number.isNaN(amount as number) ? 0 : (amount as number)
  }
}
