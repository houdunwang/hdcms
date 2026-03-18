import Upload from '#core/models/upload'
import { ImageService } from '#core/services/image_service'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import string from '@adonisjs/core/helpers/string'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { OssService } from './oss_service.ts'

/**
 * @class UploadService
 * @description
 * 文件上传服务，用于处理和管理文件的上传、存储和数据库记录。
 *
 * @features
 * - **多驱动支持**: 支持本地（local）和阿里云 OSS（oss）两种存储方式，可通过 `.env` 文件中的 `UPLOAD_DRIVER` 变量进行切换。
 * - **统一处理流程**: 无论使用何种驱动，上传流程都保持一致：
 *   1. 文件首先被移动到服务器本地的临时存储区。
 *   2. 如果驱动配置为 'oss'，文件将从本地上传到阿里云 OSS，然后删除本地的临时文件。
 *   3. 如果驱动为 'local'，文件将保留在本地。
 *   4. 最终，文件的元数据（如 URL、名称、大小等）将被记录到数据库中。
 * - **依赖注入**: 使用 `@inject()` 装饰器，自动注入 `HttpContext`，便于访问请求上下文和认证用户信息。
 */
@inject()
export class UploadService {
  /**
   * @constructor
   * @param {HttpContext} ctx - 当前 HTTP 请求的上下文，由 AdonisJS 的依赖注入容器提供。
   */
  constructor(
    protected ctx: HttpContext,
    protected ossService: OssService,
    protected imageService: ImageService
  ) { }

  /**
   * 处理文件上传的核心业务逻辑。
   *
   * @param {MultipartFile} file - 从 HTTP 请求中解析出的文件对象。
   * @returns {Promise<Upload | undefined>} 返回一个 `Upload` 模型实例，表示已存入数据库的记录。如果失败则可能返回 `undefined`。
   * @description
   * 这是文件上传的主要入口点，它协调了本地存储、OSS 上传和数据库记录的全过程。
   */
  async upload(file: MultipartFile): Promise<Upload> {
    //图片缩放处理
    await this.imageService.resize(file.tmpPath!)
    const action = env.get('UPLOAD_DRIVER')
    return await this[action](file)
  }

  /**
   * 将上传的文件移动到本地磁盘。
   *
   * @param {MultipartFile} file - 文件对象。
   * @description
   * 使用 AdonisJS Drive 服务将文件流写入到本地文件系统。
   * 文件名将基于日期和一个唯一ID（cuid）生成，以避免冲突。
   * `moveToDisk` 方法会自动填充 `file.filePath` 和 `file.meta.url`。
   */
  private async local(file: MultipartFile): Promise<Upload> {
    try {
      await file.moveToDisk(this.fileName(file))
      return await this.saveToDatabase(file)
    } catch (error) {
      throw new Error('上传文件到本地失败')
    }
  }

  /**
   * 将已保存到本地的文件上传到阿里云 OSS。
   *
   * @param {MultipartFile} file - 已经调用过 `local()` 方法的文件对象。
   * @returns  成功则返回 OSS 的响应，失败则返回 `undefined`。
   */
  async oss(file: MultipartFile): Promise<Upload> {
    try {
      const key = this.fileName(file)
      const result = await this.ossService.upload(key, file.tmpPath!)
      file.meta.url = result.url || ''
      return await this.saveToDatabase(file)
    } catch (error) {
      throw new Error('上传文件到OSS失败')
    }
  }

  /**
   * 生成文件在存储中的路径。
   *
   * @param file - 文件对象，包含文件名、扩展名等信息。
   * @returns 返回文件在本地存储中的完整路径，包括目录和文件名。
   */
  private fileName(file: MultipartFile) {
    const dir = `attachments/${DateTime.now().toFormat('yyyy/MM')}`
    const fileName =
      'U' +
      (this.ctx.auth.user?.id || 'anonymous') +
      DateTime.now().toFormat('yyyyMM') +
      '-' +
      string.uuid() +
      '.' +
      file.extname
    const path = [dir, fileName].join('/')
    return path
  }

  /**
   * 将文件元数据保存到数据库。
   *
   * @param {MultipartFile} file - 文件对象。
   * @returns {Promise<Upload>} 返回创建成功的 `Upload` 模型实例。
   */
  private async saveToDatabase(file: MultipartFile): Promise<Upload> {
    return await Upload.create({
      url: file.meta.url,
      name: file.clientName, // 保留文件的原始名称
      userId: this.ctx.auth.user?.id,
      driver: env.get('UPLOAD_DRIVER'), // 记录使用的存储驱动
      size: file.size, // 文件大小（字节）
      extension: file.extname, // 文件扩展名
    })
  }
}
