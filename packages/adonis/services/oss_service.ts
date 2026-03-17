import { OssUploadSuccessResponse } from '../types/oss.js'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import OSS from 'ali-oss'
import fs from 'node:fs'

@inject()
export class OssService {
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
  client(): OSS {
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
   * 上传到OSS
   * @param path OSS 中的路径
   * @param localFilePath 本地文件路径
   * @returns
   */
  async upload(path: string, localFilePath: string) {
    try {
      // 定义上传到 OSS 时附带的 HTTP 头。
      const headers = {
        'x-oss-storage-class': 'Standard', // 存储类型：标准存储。
        'x-oss-object-acl': 'private', // 访问权限：私有。
        'Content-Disposition': 'attachment', // 文件被访问时强制下载。
        'x-oss-tagging': 'Tag1=1&Tag2=2', // 为对象设置标签，便于管理。
        'x-oss-forbid-overwrite': 'true', // 禁止覆盖同名文件。
      }
      // 使用流式上传，提高性能和内存效率。
      const result = await this.client().put(path, fs.createReadStream(localFilePath), { headers })
      return result as unknown as OssUploadSuccessResponse
    } catch (err) {
      // 在生产环境中，这里应该使用更专业的日志记录服务
      throw err // 重新抛出异常，以便上层调用者可以捕获
    }
  }
}
