import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { existsSync, promises as fs } from 'node:fs'
import sharp from 'sharp'

@inject()
export class ImageService {
  /**
   * @constructor
   * @param {HttpContext} ctx - 当前 HTTP 请求的上下文，由 AdonisJS 的依赖注入容器提供。
   */
  constructor(protected ctx: HttpContext) {}

  /**
   * 调整图片大小
   * @param file 上传的文件对象，包含文件信息和内容。
   * @param width 目标宽度，单位为像素。
   * @param height 目标高度，单位为像素。
   */
  async resize(filePath: string): Promise<boolean> {
    try {
      if (!(await this.isImage(filePath))) return false
      const image = sharp(filePath)
      const meta = await image.metadata()
      if (meta.width > 1920 || meta.height > 1080) {
        const resizedBuffer = await image
          .resize({ width: 20, height: 20, fit: sharp.fit.contain })
          .toBuffer()
        await fs.writeFile(filePath, resizedBuffer)
      }
      return true
    } catch (err) {
      throw new Error('图片调整大小失败')
    }
  }

  async isImage(filePath: string): Promise<boolean> {
    try {
      if (!existsSync(filePath)) return false
      const meta = await sharp(filePath).metadata()
      const allowed = new Set(['jpeg', 'jpg', 'png', 'webp', 'gif', 'tiff', 'bmp'])
      return !!meta.format && allowed.has(meta.format)
    } catch (err) {
      throw new Error('图片格式验证失败')
    }
  }
}
