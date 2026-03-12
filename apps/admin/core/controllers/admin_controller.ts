import { OrderService } from '#core/services/order_service'
import { UserService } from '#core/services/user_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AdminController {
	constructor(private orderService: OrderService, private userService: UserService) { }
	async handle(ctx: HttpContext) {
		const visitorsCount = await this.userService.getVisitorsCount(7)
		const orderMonths = await this.orderService.getOrderStatsByMonth(11)
		const daySales = await this.orderService.getDaySales(7)
		return ctx.serialize({ visitorsCount, orderMonths, daySales })
	}
}
