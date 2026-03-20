import { UploadService } from '#core/services/upload_service'
import { uploadImageSingleValidator } from '#core/validators/upload'
import UploadTransformer from '#transformers/upload_transformer'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import BaseController from './bases_controller.js'
import UploadPolicy from '#core/policies/upload_policy'

@inject()
export default class UploadsController extends BaseController {
  constructor(protected uploadService: UploadService, protected ctx: HttpContext) {
    super()
  }

  /**
   * @file
   * @summary 上传文件
   * @description 上传文件到服务器
   * @tag 文件上传
   * @consumes multipart/form-data
   * @requestFormDataBody { "file": { "type": "file", "description": "文件", "required": "true" }}
   * @responseBody 200 - {"type": "object", "properties": {"url": {"type": "string"}}}
   */
  async file({ bouncer, request }: HttpContext) {
    await bouncer.with(UploadPolicy).authorize('file')
    const file = request.file('file')
    if (!file) {
      return this.error('文件不能为空')
    }
    const result = await this.uploadService.upload(file)
    return result
  }

  /**
   * @imageSingle
   * @tag 用户管理
   * @summary 更新用户头像
   * @description 更新当前认证用户的头像
   * @consumes multipart/form-data
   * @requestFormDataBody {"avatar":{"type":"file","format":"binary"}}
   * @responseBody 200 - { "url": "https://example.com/avatar.jpg" }
   */
  async image({ bouncer, request, serialize }: HttpContext) {
    await bouncer.with(UploadPolicy).authorize('image')

    const payload = await request.validateUsing(uploadImageSingleValidator)
    const result = await this.uploadService.upload(payload.file)
    return serialize(UploadTransformer.transform(result))
  }
}
