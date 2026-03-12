import { OrderService } from '#core/services/order_service'
import { UserService } from '#core/services/user_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import app from '@adonisjs/core/services/app'
import { DateTime } from 'luxon'

@inject()
export default class AdminController {
	constructor(private orderService: OrderService, private userService: UserService) { }
	async handle(ctx: HttpContext) {
		type ReturnType = {
			totalUsersCount: any;
			todayUsersCount: number;
			todaySales: number;
			orderYears: {
				year: number;
				count: number;
				amount: number;
			}[];
			orderMonths: {
				month: string;
				count: number;
				amount: number;
			}[];
			monthVisitorsCount: {
				day: string;
				count: number;
			}[];
			weekSales: number;
		}
		await new Promise(r => setTimeout(r, 100))
		const key = 'ADMIN:DASHBOARD:OVERVIEW'
		const isDev = app.inDev
		if (!isDev) {
			const cached = await cache.get({ key })
			if (cached) return ctx.serialize(cached as ReturnType) // 命中缓存直接返回
		}
		const totalUsersCount = await this.userService.getTotalUsersCount() // 总用户数
		const orderMonths = await this.orderService.getOrderStatsByMonth(24) // 最近24个月订单统计
		const weekSales = await this.orderService.getWeekSales() // 本周销售额
		const todaySales = (await this.orderService.getDaySales(1))[0].amount // 今日销售额
		const monthVisitorsCount = await this.userService.getDaysVisitorsCount(DateTime.now().day) // 本月访客数
		const todayUsersCount = monthVisitorsCount.reverse()[0].count // 今日用户数（从最近2天数组取今日）
		// const orderYears = await this.orderService.getOrderStatsByYear(5) // 最近5年订单统计
		const payload = { totalUsersCount, todayUsersCount, todaySales, orderMonths, monthVisitorsCount, weekSales } // 返回数据载荷

		if (!isDev) {
			await cache.set({ key, value: payload, ttl: '1h' })
		}
		return ctx.serialize(payload)
	}
}
