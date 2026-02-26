import { UploadService } from '#core/services/upload_service';
import { inject } from '@adonisjs/core';
import { HttpContext } from '@adonisjs/core/http';
import BaseController from './bases_controller.js';

@inject()
export default class UploadsController extends BaseController {
  constructor(protected uploadService: UploadService, protected ctx: HttpContext) {
    super()
  }

  /**
   * @handle
   * @summary 上传文件
   * @description 上传文件到服务器  
   * @tag 文件上传
   * @consumes multipart/form-data
   * @requestFormDataBody { "file": { "type": "file", "description": "文件", "required": "true" }}
   * @responseBody 200 - {"type": "object", "properties": {"url": {"type": "string"}}}
   */
  async handle({ request }: HttpContext) {
    const file = request.file('file')
    if (!file) {
      return this.error('文件不能为空')
    }
    const result = await this.uploadService.upload(file);
    return result
  }
}