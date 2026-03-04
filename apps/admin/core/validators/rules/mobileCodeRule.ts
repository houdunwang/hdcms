import { CodeService } from '#core/services/code_service'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

// 短信、邮件验证码验证规则
async function code(value: unknown, _options: void, field: FieldContext) {
  const codeService = field.meta.codeService as CodeService
  const isVerified = await codeService.verify(field.data.mobile, value as string)
  if (!isVerified) {
    field.report('验证码输入错误', 'validateCode', field)
  }
}

export const mobileCodeRule = vine.createRule(code)
