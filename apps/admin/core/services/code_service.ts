import env from '#start/env'
import cache from '@adonisjs/cache/services/main'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { emailVerificationTemplate } from '../templates/mail_code_template.js'
import { AliyunService } from './aliyun_service.js'
import { MailService } from './mail_service.js'

@inject()
export class CodeService {
  protected timeout = 60
  constructor(
    private mailService: MailService,
    private aliyunService: AliyunService,
    private ctx: HttpContext
  ) {}

  async send(field: 'email' | 'mobile', value: string) {
    if (await this.isExpired(value)) {
      const remainingSeconds = await this.getElapsedSeconds(value)
      this.ctx.response.abort(
        { message: `验证码已发送!!!，请${remainingSeconds}秒后再试`, remainingSeconds },
        400
      )
    }
    await this[field](value)
  }

  async getElapsedSeconds(value: string) {
    const cachedData = await cache.get({ key: this.getCacheKey(value) })
    const elapsedSeconds = Math.floor((Date.now() - cachedData.time) / 1000)
    return Math.max(0, 60 - elapsedSeconds)
  }

  async isExpired(account: string) {
    const cachedData = await cache.get({ key: this.getCacheKey(account) })
    return cachedData?.time && cachedData.time > Date.now() - this.timeout * 1000
  }
  // 发送邮件验证码
  private async email(mail: string) {
    const html = emailVerificationTemplate(env.get('APP_NAME'), await this.generateCode(mail))
    try {
      await this.mailService.send(mail, html)
    } catch (error) {
      throw new Error('发送验证码失败')
    }
  }

  // 发送手机验证码
  private async mobile(phone: string) {
    try {
      await this.aliyunService.sendSms(
        phone, // 手机号
        env.get('ALIYUN_SMS_CODE_SIGN')!, // 阿里云短信签名
        env.get('ALIYUN_SMS_CODE_TEMPLATE'), // 模板代码
        { code: await this.generateCode(phone) } // 模板参数
      )
    } catch (error) {
      throw new Error(error.message ?? '发送验证码失败!!')
    }
  }

  /**
   * 生成验证码并缓存
   * @param value 邮箱或手机号
   * @returns
   */
  private async generateCode(value: string) {
    const code = Math.floor(1000 + Math.random() * 9000).toString()
    await cache.set({ key: this.getCacheKey(value), value: { code, time: Date.now() }, ttl: '10m' })
    return code
  }

  /**
   * 获取验证码缓存键
   * @param value 邮箱或手机号
   * @returns
   */
  private getCacheKey(value: string) {
    if (this.ctx.auth.isAuthenticated) {
      return `CODE:${this.ctx.auth.user?.id}`
    }
    return `CODE:${value}`
  }

  /**
   * 验证验证码是否正确
   * @param value 邮箱或手机号
   * @param code 用户提交的验证码
   * @returns
   */
  public async verify(value: string, code: string) {
    // if (env.get('NODE_ENV') == 'development') return true;
    const cachedData = await cache.get({ key: this.getCacheKey(value) })
    if (!cachedData) return false

    return cachedData.code == code && cachedData.time > Date.now() - 10 * 60 * 1000
  }
}
