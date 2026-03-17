import env from '#start/env'
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525'
import * as $OpenApi from '@alicloud/openapi-client'

export class AliyunService {
  /**
   * @remarks
   * 使用凭据初始化账号Client
   * @returns Client
   *
   * @throws Exception
   */
  createClient() {
    const config = new $OpenApi.Config({
      accessKeyId: env.get('ALIYUN_ACCESS_KEY_ID'),
      accessKeySecret: env.get('ALIYUN_ACCESS_KEY_SECRET'),
      endpoint: 'dysmsapi.aliyuncs.com',
    })

    return new (Dysmsapi20170525 as any)(config)
  }

  async sendSms(
    phoneNumbers: string,
    signName: string,
    templateCode?: string,
    templateParam?: Record<string, string>
  ): Promise<void> {
    const client = this.createClient()

    const request = new $Dysmsapi20170525.SendSmsRequest({
      phoneNumbers,
      signName,
      templateCode,
      templateParam: JSON.stringify(templateParam),
    })

    try {
      await client.sendSms(request)
    } catch (error: any) {
      if (error.data?.Recommend) {
        console.log('诊断建议:', error.data.Recommend)
      }
      throw error
    }
  }
}
