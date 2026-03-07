import PackageProcess from '#core/pay/process/package'
import BindProcess from '#core/wechat/process/bindProcess'
import LoginProcess from '#core/wechat/process/loginProcess'

const hdConfig = {
  wechatProcess: [LoginProcess, BindProcess],
  payProcess: {
    pakcage: PackageProcess,
  },
}

export default hdConfig
