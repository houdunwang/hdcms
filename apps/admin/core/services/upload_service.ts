import Upload from '#core/models/upload'
import { OssUploadSuccessResponse } from '#core/types/oss'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import drive from '@adonisjs/drive/services/main'
import OSS from 'ali-oss'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path, { resolve } from 'node:path'
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
  constructor(protected ctx: HttpContext, protected ossService: OssService) { }

  /**
   * 处理文件上传的核心业务逻辑。
   *
   * @param {MultipartFile} file - 从 HTTP 请求中解析出的文件对象。
   * @returns {Promise<Upload | undefined>} 返回一个 `Upload` 模型实例，表示已存入数据库的记录。如果失败则可能返回 `undefined`。
   * @description
   * 这是文件上传的主要入口点，它协调了本地存储、OSS 上传和数据库记录的全过程。
   */
  async upload(file: MultipartFile): Promise<Upload | undefined> {
    // 步骤 1: 将文件移动到本地临时目录。这是所有上传策略的共同起点。
    await this.local(file)

    let url = ''
    // 步骤 2: 根据配置的驱动决定下一步操作。
    switch (env.get('UPLOAD_DRIVER')) {
      case 'oss':
        if (file.filePath) {
          // 调用 oss 方法将文件上传到云端。
          const result = await this.oss(file)
          // 上传成功后，删除本地的临时文件以释放空间。
          const disk = drive.use()
          await disk.delete(file.filePath)
          // 如果 OSS 操作成功并返回结果，则使用 OSS 的 URL。
          if (result) {
            url = result.url
          }
        }
        // 修正：确保在 case 'oss' 结束后中断 switch，防止意外执行 default 逻辑。
        break
      default:
        // 对于 'local' 或其他默认驱动，直接使用 `moveToDisk` 后生成的元信息中的 URL。
        url = file.meta.url
    }
    // 步骤 3: 将文件的最终信息保存到数据库。
    return this.saveToDatabase(file, url)
  }

  /**
   * 将文件元数据保存到数据库。
   *
   * @param {MultipartFile} file - 文件对象。
   * @param {string} url - 文件的最终可访问 URL。
   * @returns {Promise<Upload>} 返回创建成功的 `Upload` 模型实例。
   */
  async saveToDatabase(file: MultipartFile, url: string): Promise<Upload> {
    return await Upload.create({
      url,
      name: file.clientName, // 保留文件的原始名称
      userId: this.ctx.auth.user?.id,
      driver: env.get('UPLOAD_DRIVER'), // 记录使用的存储驱动
      size: file.size, // 文件大小（字节）
      extension: file.extname, // 文件扩展名
    })
  }

  fileName(file: MultipartFile) {
    const dir = `attachments/${DateTime.now().toFormat('yyyy/MM')}`
    const fileName = 'U' + (this.ctx.auth.user?.id || 'anonymous') + '-' + DateTime.now().toFormat('MMddHHmmss') + '.' + file.extname
    const path = [dir, fileName].join('/')
    return path
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
  async local(file: MultipartFile) {
    // @todo: 检查 `drive.ts` 配置。如果 local disk 的 `root` 已经是 'uploads'，
    // 这里的 `key` 中就不应再包含 'uploads/' 前缀，否则会导致路径重复 (e.g., 'uploads/uploads/...').
    await file.moveToDisk(this.fileName(file))
  }

  /**
   * 将已保存到本地的文件上传到阿里云 OSS。
   *
   * @param {MultipartFile} file - 已经调用过 `local()` 方法的文件对象。
   * @returns {Promise<OssUploadSuccessResponse | undefined>} 成功则返回 OSS 的响应，失败则返回 `undefined`。
   */
  async oss(file: MultipartFile): Promise<OssUploadSuccessResponse | undefined> {
    const localFilePath = app.makePath('storage', file.filePath!)
    const key = this.fileName(file)
    return await this.ossService.upload(key, localFilePath)
  }
}
