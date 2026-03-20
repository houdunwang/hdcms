
import AdminPolicy from '#core/policies/admin_policy'
import { OrderService } from '#core/services/order_service'
import { SubscribeService } from '#core/services/subscribe_service'
import { UserService } from '#core/services/user_service'
import cache from '@adonisjs/cache/services/main'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { DateTime } from 'luxon'

@inject()
export default class AdminController {
  constructor(private orderService: OrderService, private userService: UserService, private subscribeService: SubscribeService) {
  }

  /**
   * @index
   * @operationId index
   * @tag 统计数据
   * @summary 统计数据
   * @description 获取统计数据
   * @responseBody 200 - { "token":{"type": "string", "token": "string"}, "user": "<User>" }
   */
  async index(ctx: HttpContext) {
    await ctx.bouncer.with(AdminPolicy).authorize('handle')
    type ReturnType = {
      totalUsersCount: any
      todayUsersCount: number
      todaySales: number
      // orderYears: {
      // 	year: number;
      // 	count: number;
      // 	amount: number;
      // }[];
      orderMonths: {
        month: string
        count: number
        amount: number
      }[]
      monthVisitorsCount: {
        day: string
        count: number
      }[]
      weekSales: number
      subscribersByMonth: {
        month: string
        count: number
      }[]
      validSubscribers: number
    }
    await new Promise((r) => setTimeout(r, 100))
    const key = 'ADMIN:DASHBOARD:OVERVIEW'
    const isDev = app.inDev
    if (!isDev) {
      const cached = await cache.get({ key })
      if (cached) return ctx.serialize(cached as ReturnType) // 命中缓存直接返回
    }

    //用户统计
    const totalUsersCount = await this.userService.getTotalUsersCount() // 总用户数
    const monthVisitorsCount = await this.userService.getDaysVisitorsCount(
      DateTime.now().day - 15 > 0 ? 15 : DateTime.now().day
    ) // 15天访客数
    const todayUsersCount = monthVisitorsCount.reverse()[0].count // 今日用户数（从最近2天数组取今日）
    //订单相关
    const orderMonths = await this.orderService.getOrderStatsByMonth(12) // 最近12个月订单统计
    const orderYears = await this.orderService.getOrderStatsByYear(5) // 最近5年订单统计
    //销售额
    const weekSales = await this.orderService.getWeekSales() // 本周销售额
    const todaySales = (await this.orderService.getDaySales(1))[0].amount // 今日销售额
    //订阅相关
    const totalSubscribers = await this.subscribeService.getTotalSubscribers() // 获取总订阅人数
    const validSubscribers = await this.subscribeService.getTotalValidSubscribers() // 获取有效订阅人数
    const subscribersByMonth = await this.subscribeService.getSubscribersByMonthCount(12) // 获取最近12个月订阅人数

    //返回数据载荷
    const payload = {
      validSubscribers,
      subscribersByMonth,
      totalUsersCount,
      todayUsersCount,
      todaySales,
      orderMonths,
      monthVisitorsCount,
      weekSales,
      orderYears,
      totalSubscribers,
    }
    if (!isDev) {
      await cache.set({ key, value: payload, ttl: '1h' })
    }
    return ctx.serialize(payload)
  }
}
