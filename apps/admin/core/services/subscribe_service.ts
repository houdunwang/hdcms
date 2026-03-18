import Subscribe from '#core/models/subscribe'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export class SubscribeService {
  /**
   * 获取有效订阅人数
   * @returns 有效订阅人数
   */
  async getTotalValidSubscribers() {
    const rows = await Subscribe.query()
      .where('end_time', '>', DateTime.now().toSQL({ includeOffset: false })!)
      .countDistinct('user_id as count')
    const raw = (rows[0] as any)?.$extras?.count ?? (rows[0] as any)?.count
    const n = typeof raw === 'string' ? Number.parseInt(raw, 10) : Number(raw ?? 0)
    return Number.isNaN(n) ? 0 : n
  }

  /**
   * 获取总订阅人数
   * @returns 总订阅人数
   */
  async getTotalSubscribers() {
    const rows = await Subscribe.query().countDistinct('user_id as count')
    const raw = (rows[0] as any)?.$extras?.count ?? (rows[0] as any)?.count
    const n = typeof raw === 'string' ? Number.parseInt(raw, 10) : Number(raw ?? 0)
    return Number.isNaN(n) ? 0 : n
  }

  /**
   * 获取按指定月数的订阅人数，返回每个月的数据
   * @param monthCount - 月数
   * @returns 按指定月数的订阅人数，每个月的数据
   */
  async getSubscribersByMonthCount(monthCount: number) {
    const now = DateTime.now()
    const count = Math.max(1, monthCount)
    const from = now.minus({ months: count - 1 }).startOf('month')
    const rows: Array<{ ym: string; count: number | string }> = await db
      .from('subscribes')
      .where('created_at', '>=', from.toSQL({ includeOffset: false })!)
      .select(db.raw('DATE_FORMAT(created_at, "%Y-%m") as ym'))
      .countDistinct('user_id as count')
      .groupBy('ym')
      .orderBy('ym', 'asc')
    const months: Array<{ month: string; count: number }> = []
    for (let i = count - 1; i >= 0; i--) {
      const label = now.minus({ months: i }).toFormat('yyyy-LL')
      const r = rows.find((x) => x.ym === label)
      const cnt = r
        ? typeof r.count === 'string'
          ? Number.parseInt(r.count as string, 10)
          : Number(r.count)
        : 0
      months.push({ month: label, count: Number.isNaN(cnt) ? 0 : cnt })
    }
    return months
  }
}
