import { url } from '#core/helper';
import { OrderService } from '#core/services/order_service';
import { PayService } from '#core/services/pay_service';
import { PayResult } from '#core/types/payResult';
import { payValidator, type PayPayload } from '#core/validators/pay';
import { inject } from '@adonisjs/core';
import { HttpContext } from '@adonisjs/core/http';
import qrcode from 'qrcode';
import BaseController from './bases_controller.js';
import env from '#start/env';

@inject()
export default class PaysController extends BaseController {
  constructor(private payService: PayService, protected ctx: HttpContext, protected orderService: OrderService) {
    super()
  }


  /**
   * @handle
   * @tag 在线支付
   * @summary 发起支付
   * @operationId initiatePayment
   * @description 根据订单信息发起支付，并生成用于扫码支付的二维码
   * @requestFormDataBody { "subject": { "type": "string", "required": "true", "description": "订单标题", "example": "商品-VIP会员" }, "orderable_type": { "type": "string", "required": "true", "description": "订单类型", "enum": ["subscribe", "test"] }, "orderable_id": { "type": "number", "required": "true", "description": "关联ID", "example": 0.01 } }
   * @responseBody 200 - { "code": 200, "message": "生成成功", "data": { "sn": "string", "qrImg": "string" } }
   */
  async handle({ request }: HttpContext) {
    const payload: PayPayload = await request.validateUsing(payValidator)
    const price = await this.payService.getPrice(payload.orderable_type, payload.orderable_id)
    const order = await this.orderService.create({ ...payload, price })
    const notifyUrl = url('pay.notify')
    const params = {
      description: payload.subject,
      out_trade_no: order.sn,
      notify_url: notifyUrl,
      amount: {
        total: price * 100,
      },
      scene_info: {
        payer_client_ip: request.ip(),
      },
    };
    const result = await this.payService.pay().transactions_native(params);
    const qrImg = await qrcode.toDataURL(result.data.code_url)
    return this.success('生成成功', { sn: order.sn, qrImg })
  }

  /**
   * @notify
   * @tag 在线支付
   * @summary 支付通知
   * @operationId payNotification
   * @description 接收微信支付异步通知，更新订单状态并处理业务逻辑
   * @requestFormDataBody { "resource": { "type": "string", "required": "true", "description": "加密后的通知数据", "example": "..." } }
   * @responseBody 200 - { "code": 200, "message": "成功" }
   */
  async notify({ request, response }: HttpContext) {
    try {
      const resource = request.input('resource')
      const { ciphertext, associated_data, nonce } = resource
      const params = await this.payService.pay().decipher_gcm(ciphertext, associated_data, nonce, env.get('WECHAT_PAY_KEY')!) as PayResult
      const order = await this.orderService.getOrderBySn(params.out_trade_no)
      if (!order.payState && params.trade_state === 'SUCCESS') {
        order.payState = true
        order.payType = 'wepay'
        order.tradeNo = params.transaction_id
        await order.save()
        await this.payService.processPay(order)
      }
      return response.status(200).send({ code: 'SUCCESS', message: '成功' })
    } catch (error) {
      console.error('微信支付通知处理失败:', error)
      return response.status(500).send({ code: 'FAIL', message: '失败' })
    }
  }
}