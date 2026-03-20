import type Order from '#core/models/order'
import { type Authenticator } from '@adonisjs/auth'
import { type Authenticators } from '@adonisjs/auth/types'
import { BaseTransformer } from '@adonisjs/core/transformers'
import UserTransformer from './user_transformer.ts'

export default class OrderTransformer extends BaseTransformer<Order> {
  constructor(protected resource: Order, protected auth?: Authenticator<Authenticators>) {
    super(resource)
  }

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
      user: UserTransformer.transform(this.resource.user)
    }
  }
}
