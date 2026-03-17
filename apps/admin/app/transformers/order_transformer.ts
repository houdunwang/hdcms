import type Order from '@hdcms/adonis/models/order.ts'
import { BaseTransformer } from '@adonisjs/core/transformers'
import UserTransformer from './user_transformer.ts'

export default class OrderTransformer extends BaseTransformer<Order> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'sn',
        'tradeNo',
        'payState',
        'userId',
        'price',
        'payType',
        'orderableId',
        'orderableType',
        'subject',
        'data',
        'createdAt',
        'updatedAt',
      ]),
      user: UserTransformer.transform(this.resource.user),
    }
  }
}
