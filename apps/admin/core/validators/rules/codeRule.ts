import { CodeService } from '#core/services/code_service'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

// 短信、邮件验证码验证规则
async function code(value: unknown, _options: void, field: FieldContext) {
  const account = field.data?.account

  if (!account) {
    field.report('请输入账号', 'validateCode', field)
    return
  }
  const isVerified = await CodeService.verify(field.data['account'], value as string)
  if (!isVerified) {
    field.report('验证码输入错误', 'validateCode', field)
  }
}

export const codeRule = vine.createRule(code)
