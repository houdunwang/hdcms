import hdConfig from '#config/hd'
import { currentDirectory } from '#core/helper'
import Order from '#core/models/order'
import env from '#start/env'
import fs from 'node:fs'
import { resolve } from 'node:path'
import WxPay from 'wechatpay-node-v3'

/**
 * 支付服务类，用于处理所有与支付相关的逻辑
 */
export class PayService {
  constructor() { }
  /**
   * 初始化并返回微信支付实例
   * @returns {WxPay} 微信支付SDK实例
   */
  public pay(): WxPay {
    const __dirname = currentDirectory(import.meta.url);
    const pay = new WxPay({
      appid: env.get('WECHAT_PAY_APPID')!,
      mchid: env.get('WECHAT_PAY_MCHID')!,
      publicKey: fs.readFileSync(resolve(__dirname, '../../../../config/pay/wepay/apiclient_cert.pem')), // 公钥
      privateKey: fs.readFileSync(resolve(__dirname, '../../../../config/pay/wepay/apiclient_key.pem')), // 秘钥
      key: env.get('WECHAT_PAY_KEY')!,
    })
    return pay
  }

  /**
   * 根据订单类型和ID获取价格
   * @param orderable_type - 订单关联的模型，例如 'subscribe'
   * @param orderable_id - 关联模型的ID
   * @returns {Promise<number>} 返回计算后的价格
   */
  public async getPrice(
    orderable_type: keyof typeof hdConfig.payProcess,
    orderable_id: number
  ): Promise<number> {
    const process = new hdConfig.payProcess[orderable_type]()
    return await process.getPrice(orderable_id)
  }

  /**
   * 处理订单支付成功后的业务逻辑
   * @param order - 需要处理的订单实例
   * @returns {Promise<any>} 返回处理结果
   */
  public async processPay(payType: string, sn: string, tradeNo: string): Promise<any> {
    const order = await Order.findByOrFail('sn', sn)
    if (!order.payState) {
      try {
        const orderable_type = order.orderableType as keyof typeof hdConfig.payProcess
        const process = new hdConfig.payProcess[orderable_type]()
        await process.handle(order)
        order.payState = true
        order.payType = payType
        order.tradeNo = tradeNo
        return await order.save()
      } catch (error) {
        throw new Error('订单处理失败')
      }
    }
  }
}
