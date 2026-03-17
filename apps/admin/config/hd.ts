import PackageProcess from '@hdcms/adonis/pay/process/package.ts'
import BindProcess from '@hdcms/adonis/wechat/process/bindProcess.ts'
import LoginProcess from '@hdcms/adonis/wechat/process/loginProcess.ts'

const hdConfig = {
  //微信消息处理器
  wechatProcess: [LoginProcess, BindProcess],
  //支付处理器
  payProcess: {
    package: PackageProcess,
  },
}

export default hdConfig
