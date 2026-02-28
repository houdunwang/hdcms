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
import fs from 'node:fs'
import path from 'node:path'

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
  constructor(protected ctx: HttpContext) { }

  /**
   * 获取并配置阿里云 OSS 客户端实例。
   *
   * @private
   * @returns {OSS} 返回一个配置好的 `ali-oss` 客户端实例。
   * @description
   * 此方法从环境变量中读取 OSS 相关的配置（如 region, accessKey, endpoint 等），
   * 并初始化一个 OSS 客户端。配置 `authorizationV4: true` 以启用 V4 签名，
   * 这对于某些新的 OSS region 是必需的。
   */
  getOssClient(): OSS {
    const client = new OSS({
      region: env.get('UPLOAD_OSS_REGION')!,
      accessKeyId: env.get('ALIYUN_ACCESS_KEY_ID')!,
      accessKeySecret: env.get('ALIYUN_ACCESS_KEY_SECRET')!,
      authorizationV4: true, // 启用 V4 签名
      endpoint: env.get('UPLOAD_OSS_ENDPOINT')!, // 建议使用内网 endpoint 以提高性能和降低成本
      bucket: env.get('UPLOAD_OSS_BUCKET')!,
    })

    return client
  }

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

  fileName() {
    return this.ctx.auth.user?.id || 'anonymous' + DateTime.now().toFormat('MMddHHmmss')
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
    const key = `uploads/${DateTime.now().toFormat('yyyy/MM')}/${this.fileName()}.${file.extname}`
    await file.moveToDisk(key)
  }

  /**
   * 将已保存到本地的文件上传到阿里云 OSS。
   *
   * @param {MultipartFile} file - 已经调用过 `local()` 方法的文件对象。
   * @returns {Promise<OssUploadSuccessResponse | undefined>} 成功则返回 OSS 的响应，失败则返回 `undefined`。
   */
  async oss(file: MultipartFile): Promise<OssUploadSuccessResponse | undefined> {
    // 定义上传到 OSS 时附带的 HTTP 头。
    const headers = {
      'x-oss-storage-class': 'Standard', // 存储类型：标准存储。
      'x-oss-object-acl': 'private', // 访问权限：私有。
      'Content-Disposition': 'attachment', // 文件被访问时强制下载。
      'x-oss-tagging': 'Tag1=1&Tag2=2', // 为对象设置标签，便于管理。
      'x-oss-forbid-overwrite': 'true', // 禁止覆盖同名文件。
    }
    try {
      const localFilePath = app.makePath('storage', file.filePath!)
      const ext = path.extname(file.clientName) // 从原始文件名获取扩展名，更可靠
      const directory = DateTime.now().toFormat('yyyy/MM')
      // 构造在 OSS 中的存储路径和文件名。
      const key = `${directory}/${this.fileName()}.${ext}`

      // 使用流式上传，提高性能和内存效率。
      const result = await this.getOssClient().put(key, fs.createReadStream(localFilePath), { headers })

      return result as unknown as OssUploadSuccessResponse
    } catch (err) {
      // 在生产环境中，这里应该使用更专业的日志记录服务。
      throw err // 重新抛出异常，以便上层调用者可以捕获。
    }
  }
}
