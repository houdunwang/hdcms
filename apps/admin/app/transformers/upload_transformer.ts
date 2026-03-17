import type Upload from '@hdcms/adonis/models/upload.ts'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UploadTransformer extends BaseTransformer<Upload> {
  toObject() {
    return this.pick(this.resource, ['id', 'url', 'userId', 'mime'])
  }
}
