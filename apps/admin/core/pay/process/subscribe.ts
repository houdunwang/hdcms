import Order from '#core/models/order'

export default class SubscribeProcess {
	// 支付成功后，为用户关联课程
	async handle(order: Order) {
		// 编写业务逻辑，例如：
		// await UserCourse.create({ userId: order.userId, courseId: order.orderableId });
		console.log(`为用户 ${order.userId} 开通课程 ${order.orderableId}`)
	}

	// 根据课程ID从数据库获取价格
	async getPrice(id: number): Promise<number> {
		return 1;
	}
}