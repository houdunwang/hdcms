import type Order from '#core/models/order';


/**
 * 处理套餐购买订单的支付成功事件。
 */
export default class PackageProcess {
  // 支付成功后，为用户关联课程
  async handle(_order: Order) {
    // 编写业务逻辑，例如：
    // await UserCourse.create({ userId: order.userId, courseId: order.orderableId });
    // console.log(`为用户 ${order.userId} 开通订阅权限 ${order.orderableId}`)
    return true;
  }

  // 根据课程ID从数据库获取价格
  async getPrice(_id: number): Promise<number> {
    return 0.01
  }
}
