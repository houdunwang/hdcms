import Upload from '#core/models/upload'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UploadTransformer extends BaseTransformer<Upload> {
  toObject() {
    return this.pick(this.resource, ['id', 'url', 'user_id'])
  }
}