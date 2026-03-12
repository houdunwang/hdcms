import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

export class UserService {
  /**
   * 根据天数获取网站访问用户数，包含每一天的数据
   * @param days 天数
   * @returns 访问用户数，包含每一天的数据
   */
  async getVisitorsCount(days: number) {
    const now = DateTime.now()
    const from = now.startOf('day').minus({ days })
    const rows: Array<{ ymd: string; count: string | number }> = await db
      .from('users')
      .select(db.raw('DATE_FORMAT(updated_at, "%Y-%m-%d") as ymd'))
      .where('updated_at', '>=', from.toSQL({ includeOffset: false })!)
      .groupBy('ymd')
      .count('id as count')
      .orderBy('ymd', 'asc')

    const result: Array<{ day: string; count: number }> = []
    for (let i = days; i >= 0; i--) {
      const label = now.minus({ days: i }).toFormat('yyyy-LL-dd')
      const r = rows.find((x) => x.ymd === label)
      const cnt = r ? (typeof r.count === 'string' ? Number.parseInt(r.count, 10) : Number(r.count)) : 0
      result.push({ day: label, count: Number.isNaN(cnt) ? 0 : cnt })
    }
    return result
  }
}
