import Config from '#core/models/config'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ConfigTransformer extends BaseTransformer<Config> {
  toObject() {
    return {
      ...this.pick(this.resource, ['name', 'value'])
    }
  }
}