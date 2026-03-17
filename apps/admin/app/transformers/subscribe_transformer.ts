import type Subscribe from '@hdcms/adonis/models/subscribe.ts'
import { BaseTransformer } from '@adonisjs/core/transformers'
import UserTransformer from './user_transformer.ts'

export default class SubscribeTransformer extends BaseTransformer<Subscribe> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'endTime',
        'description',
        'userId',
        'createdAt',
        'updatedAt',
      ]),
      user: UserTransformer.transform(this.resource.user),
    }
  }
}
