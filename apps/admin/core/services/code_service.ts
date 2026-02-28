import env from '#start/env';
import cache from '@adonisjs/cache/services/main';
import { inject } from '@adonisjs/core';
import { HttpContext } from '@adonisjs/core/http';
import { emailVerificationTemplate } from '../templates/mail_template.js';
import { AliyunService } from './aliyun_service.js';
import { MailService } from './mail_service.js';

@inject()
export class CodeService {
  constructor(
    private mailService: MailService,
    private aliyunService: AliyunService,
    private ctx: HttpContext
  ) { }

  async send(account: string) {
    const emailOrMobile = account || this.ctx.request.input('account')
    const cachedData = await cache.get({ key: CodeService.getCacheKey(emailOrMobile) })

    if (cachedData?.time && cachedData.time > Date.now() - 60 * 1000) {
      const elapsedSeconds = Math.floor((Date.now() - cachedData.time) / 1000)
      const remainingSeconds = Math.max(0, 60 - elapsedSeconds)
      this.ctx.response.abort({ message: `验证码已发送，请${remainingSeconds}秒后再试`, remainingSeconds }, 400)
    }
    const action = emailOrMobile.includes('@') ? 'mail' : 'mobile'
    await this[action](emailOrMobile)

  }

  // 发送邮件验证码
  async mail(mail: string) {
    const html = emailVerificationTemplate(env.get('APP_NAME'), this.generateCode(mail))
    try {
      await this.mailService.send(mail, html)
    } catch (error) {
      throw new Error('发送验证码失败')
    }
  }

  // 发送手机验证码
  async mobile(phone: string) {
    try {
      await this.aliyunService.sendSms(
        phone, // 手机号
        env.get('ALIYUN_SMS_CODE_SIGN')!, // 阿里云短信签名
        env.get('ALIYUN_SMS_CODE_TEMPLATE'), // 模板代码
        { code: this.generateCode(phone) } // 模板参数
      )
    } catch (error) {
      throw new Error(error.message ?? '发送验证码失败!!')
    }
  }

  private generateCode(account: string) {
    const code = Math.floor(1000 + Math.random() * 9000).toString()
    cache.set({ key: CodeService.getCacheKey(account), value: { code, time: Date.now() }, ttl: '10m' })
    return code
  }

  private static getCacheKey(account: string) {
    return `CODE:${account}`
  }

  static async verify(account: string, code: string) {
    // if (env.get('NODE_ENV') == 'development') return true;
    const cachedData = await cache.get({ key: CodeService.getCacheKey(account) })
    if (!cachedData) return false

    return cachedData.code == code && cachedData.time > Date.now() - 10 * 60 * 1000
  }
}
