import cache from '@adonisjs/cache/services/main'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

async function captcha(value: unknown, _options: void, field: FieldContext) {
  const key = field.data.captcha_key as string
  const captcha = await cache.get({ key })
  if (!key || captcha != value) {
    field.report('验证码输入错误', 'captcha', field)
  }
}

export const captchaRule = vine.createRule(captcha)
