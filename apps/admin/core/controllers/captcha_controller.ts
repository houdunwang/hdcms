
import cache from '@adonisjs/cache/services/main'
import { type HttpContext } from '@adonisjs/core/http'
import { randomUUID } from 'node:crypto'
import svgCaptcha from 'svg-captcha'

export default class CaptchaController {
  /**
   * @handle
   * @tag 系统功能
   * @operationId captcha
   * @summary 图形验证码
   * @description 获取图形验证码 <br /> <img src="/captcha" alt="captcha" />
   * @responseBody 200 - { "key": "string", "svg": "string" } - 图形验证码数据
   */
  async handle({ serialize }: HttpContext) {
    const captcha = svgCaptcha.createMathExpr({
      noise: 2, // 干扰线条数
      color: true, // 验证码字符是否有颜色
      mathMin: 1,
      mathMax: 9,
      width: 120,
      height: 32,
    })

    // 在实际项目中，你应该将 captcha.text 存储在缓存或数据库中，并关联一个 key 返回给前端
    const captchaKey = `captcha-${randomUUID()}`
    await cache.set({ key: captchaKey, value: captcha.text, ttl: '20m' })
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('')
      }, 500)
    })
    return serialize({
      key: captchaKey,
      svg: captcha.data,
    })
  }
}
