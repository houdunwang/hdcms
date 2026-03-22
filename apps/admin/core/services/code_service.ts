
import { emailVerificationTemplate } from '#core/templates/mail_code_template'
import env from '#start/env'
import cache from '@adonisjs/cache/services/main'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { AliyunSmsService } from './aliyun_sms_service.ts'
import { MailService } from './mail_service.js'
import app from '@adonisjs/core/services/app'

@inject()
export class CodeService {
  protected timeout = 60
  /**
   * 构造函数，注入依赖服务
   * @param mailService 邮件服务实例
   * @param aliyunSmsService 阿里云服务实例
   * @param ctx HTTP 上下文
   */
  constructor(private mailService: MailService, private aliyunSmsService: AliyunSmsService, private ctx: HttpContext) { }

  /**
   * 发送验证码（邮件或短信）
   * 包含发送频率限制检查（默认冷却时间为60秒）
   * @param field 发送渠道：'email' 邮箱 | 'mobile' 手机
   * @param value 接收验证码的邮箱地址或手机号
   */
  async send(field: 'email' | 'mobile', value: string) {
    if (await this.isExpired(value)) {
      const remainingSeconds = await this.getElapsedSeconds(value)
      this.ctx.response.abort(
        { message: `验证码已发送。请${remainingSeconds}秒后再试`, remainingSeconds },
        400
      )
    }
    await this[field](value)
  }

  /**
   * 计算距离下次允许发送验证码还需要等待的时间（倒计时）
   * @param value 邮箱地址或手机号
   * @returns 剩余等待的秒数（最小为0）
   */
  async getElapsedSeconds(value: string) {
    const cachedData = await cache.get({ key: this.getCacheKey(value) })
    const elapsedSeconds = Math.floor((Date.now() - cachedData.time) / 1000)
    return Math.max(0, 60 - elapsedSeconds)
  }

  /**
   * 检查指定账号的验证码是否仍在发送冷却期内
   * @param field 账号（邮箱或手机号）
   * @returns 如果在冷却期内返回 true，否则返回 false
   */
  async isExpired(field: string) {
    const cachedData = await cache.get({ key: this.getCacheKey(field) })
    return cachedData?.time && cachedData.time > Date.now() - this.timeout * 1000
  }

  /**
   * 内部方法：发送邮件验证码
   * 生成验证码并利用模板引擎渲染后通过邮件服务发送
   * @param mail 目标邮箱地址
   */
  private async email(mail: string) {
    try {
      const code = await this.generateCode(mail)
      console.log('email', mail)
      console.log('code', code)
      console.log("env.get('APP_NAME')", env.get('APP_NAME'))
      const html = emailVerificationTemplate(env.get('APP_NAME') || '', code)
      await this.mailService.send(mail, html)
    } catch (error) {
      await cache.delete({ key: this.getCacheKey(mail) })
      throw new Error((app.inDev && (error.message || String(error))) + '发送验证码失败')
    }
  }

  /**
   * 内部方法：发送手机短信验证码
   * 生成验证码并通过阿里云短信服务发送
   * @param phone 目标手机号
   */
  private async mobile(phone: string) {
    try {
      await this.aliyunSmsService.sendSms(
        phone,
        env.get('ALIYUN_SMS_CODE_SIGN')!, // 阿里云短信签名
        env.get('ALIYUN_SMS_CODE_TEMPLATE')!, // 模板代码
        { code: await this.generateCode(phone) } // 模板参数
      )
    } catch (error) {
      await cache.delete({ key: this.getCacheKey(phone) })
      throw new Error((app.inDev && error.message) + '发送验证码失败!!')
    }
  }

  /**
   * 生成 4 位随机验证码并写入缓存
   * @param value 邮箱或手机号
   * @returns {Promise<string>} 生成的字符串验证码
   */
  private async generateCode(value: string): Promise<string> {
    const code = Math.floor(1000 + Math.random() * 9000).toString()
    await cache.set({ key: this.getCacheKey(value), value: { code, time: Date.now() }, ttl: '10m' })
    return code
  }

  /**
   * 获取验证码在缓存系统中的键名（Key）
   * 如果用户已登录则使用用户 ID，否则使用传入的邮箱或手机号
   * @param value 邮箱或手机号
   * @returns {string} 拼接后的缓存键字符串
   */
  private getCacheKey(value: string): string {
    if (this.ctx.auth.isAuthenticated) {
      return `CODE:${this.ctx.auth.user?.id}`
    }
    return `CODE:${value}`
  }

  /**
   * 验证用户提交的验证码是否正确（20分钟内有效）
   * @param field 邮箱或手机号
   * @param code 用户提交的验证码
   * @returns {Promise<boolean>} 验证成功返回 true，否则返回 false
   */
  async verify(field: string, code: string): Promise<boolean> {
    const cachedData = await cache.get({ key: this.getCacheKey(field) })
    if (!cachedData) return false

    return cachedData.code == code && cachedData.time > Date.now() - 20 * 60 * 1000
  }
}
