import type Package from '@hdcms/adonis/models/package.ts'
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
        'feature',
      ]),
      state: Boolean(this.resource.state),
      price: Number(this.resource.price),
      originalPrice: Number(this.resource.originalPrice),
    }
  }
}
