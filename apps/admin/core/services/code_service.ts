import cache from '@adonisjs/cache/services/main'
import { inject } from '@adonisjs/core'
import { MailService } from './mail_service.js'
import env from '#start/env'
import { emailVerificationTemplate } from '../templates/mail_template.js'
import { AliyunService } from './aliyun_service.js'

@inject()
export class CodeService {
  constructor(
    private mailService: MailService,
    private aliyunService: AliyunService
  ) { }

  // 发送邮件验证码
  mail(mail: string) {
    const html = emailVerificationTemplate(env.get('APP_NAME'), this.generateCode(mail))
    try {
      this.mailService.send(mail, html)
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
      return { success: true, message: 'SMS sent successfully' }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  private generateCode(account: string) {
    const code = Math.floor(1000 + Math.random() * 9000).toString()
    cache.set({ key: `CODE:${account}`, value: code, ttl: '10m' })
    return code
  }

  static async verify(account: string, code: string) {
    if (env.get('NODE_ENV') == 'development') return true;
    const cachedCode = await cache.get({ key: `CODE:${account}` })

    return cachedCode == code
  }
}
