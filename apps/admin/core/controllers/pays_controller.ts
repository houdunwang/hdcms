import { url } from '#core/helper';
import { OrderService } from '#core/services/order_service';
import { PayService } from '#core/services/pay_service';
import { PayResult } from '#core/types/payResult';
import { payCheckValidator, payValidator, type PayPayload } from '#core/validators/pay';
import env from '#start/env';
import { inject } from '@adonisjs/core';
import { HttpContext } from '@adonisjs/core/http';
import qrcode from 'qrcode';
import BaseController from './bases_controller.js';

@inject()
export default class PaysController extends BaseController {
  constructor(private payService: PayService, protected ctx: HttpContext, protected orderService: OrderService) {
    super()
  }


  /**
   * @wepay
   * @tag 在线支付
   * @summary 发起支付
   * @operationId initiatePayment
   * @description 根据订单信息发起支付，并生成用于扫码支付的二维码
   * @requestFormDataBody { "subject": { "type": "string", "required": "true", "description": "订单标题", "example": "商品-VIP会员" }, "orderable_type": { "type": "string", "required": "true", "description": "订单类型,参考config/pay.ts文件中的process属性", "enum": ["subscribe", "test"] }, "orderable_id": { "type": "number", "required": "true", "description": "关联ID", "example": 0.01 } }
   * @responseBody 200 - { "code": 200, "message": "生成成功", "data": { "sn": "string", "qrImg": "string" } }
   */
  async wepay({ request, serialize }: HttpContext) {
    try {
      const payload: PayPayload = await request.validateUsing(payValidator)
      const price = await this.payService.getPrice(payload.orderable_type, payload.orderable_id)
      const order = await this.orderService.create({ ...payload, price })
      const notifyUrl = url('pay.notify')
      console.log('notifyUrl', notifyUrl)
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
      const qrImg = await qrcode.toDataURL(result.data.code_url, {
        width: 250,
      })
      return serialize({ sn: order.sn, qrImg })
    } catch (error) {
      return this.error('生成二维码失败')
    }
  }


  /**
   * @wepayCheck
   * @tag 在线支付
   * @summary 微信扫码支付验证
   * @description 处理用户扫码支付成功后的验证逻辑，更新订单状态
   * @operationId notify
   * @requestFormDataBody { "sn": { "type": "string", "required": "true", "description": "订单号", "example": "" } }
   * @responseBody 200 - {  "success": true }
   */
  async wepayCheck({ request, serialize }: HttpContext) {
    const payload = await request.validateUsing(payCheckValidator)
    const isSuccess = await this.orderService.checkPaystatus(payload.sn)
    if (isSuccess) {
      return serialize({ message: '支付成功', success: true })
    }
    return serialize({ success: false })
  }

  /**
   * @notify
   * @tag 在线支付
   * @summary 支付通知
   * @description 接收微信服务器发送来的支付异步通知，更新订单状态并处理业务逻辑
   * @operationId payNotification
   * @requestFormDataBody { "resource": { "type": "string", "required": "true", "description": "加密后的通知数据", "example": "..." } }
   * @responseBody 200 - { "code": 200, "message": "成功" }
   */
  async notify({ request, response }: HttpContext) {
    try {
      const resource = request.input('resource')
      console.log('resource', resource)
      const { ciphertext, associated_data, nonce } = resource
      const params = await this.payService.pay().decipher_gcm(ciphertext, associated_data, nonce, env.get('WECHAT_PAY_KEY')!) as PayResult
      if (params.trade_state === 'SUCCESS') {
        await this.payService.processPay('wepay', params.out_trade_no, params.transaction_id)
      }
      return response.status(200).send({ code: 'SUCCESS', message: '成功' })
    } catch (error) {
      return response.status(500).send({ code: 'FAIL', message: '失败' })
    }
  }
}  
