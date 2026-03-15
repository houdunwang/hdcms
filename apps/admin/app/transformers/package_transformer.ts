import Package from '#core/models/package'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class PackageTransformer extends BaseTransformer<Package> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'title',
        'ad',
        'price',
        'months',
        'icon',
        'recommend',
        'originalPrice',
        'state',
        'feature'
      ]),
      state: Boolean(this.resource.state),
    }
  }
}