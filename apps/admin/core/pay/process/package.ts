import type Order from '#core/models/order'
import Package from '#core/models/package'
import Subscribe from '#core/models/subscribe'
import { DateTime } from 'luxon'

/**
 * 处理套餐购买订单的支付成功事件。
 */
export default class PackageProcess {
  // 支付成功后，为用户关联课程
  async handle(order: Order) {
    const packageInstance = await Package.findOrFail(order.orderableId)
    const subscribe = await Subscribe.firstOrCreate(
      {
        userId: order.userId,
      },
      {
        endTime: DateTime.now(),
      }
    )
    const endTime = DateTime.now() > subscribe.endTime ? DateTime.now() : subscribe.endTime
    subscribe.endTime = endTime.plus({ month: packageInstance.months })
    await subscribe.save()
    // 编写业务逻辑，例如：
    // await UserCourse.create({ userId: order.userId, courseId: order.orderableId });
    return true
  }

  // 根据课程ID从数据库获取价格
  async getPrice(id: number): Promise<string> {
    const item = await Package.findOrFail(id)
    return item.price
  }
}
