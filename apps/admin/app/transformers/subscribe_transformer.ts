import Subscribe from '#core/models/subscribe'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class SubscribeTransformer extends BaseTransformer<Subscribe> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'endTime',
      'description',
    ])
  }
}