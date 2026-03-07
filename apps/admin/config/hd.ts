import BindProcess from '#core/wechat/process/bindProcess'
import LoginProcess from '#core/wechat/process/loginProcess'

const hdConfig = {
  wechatProcess: [LoginProcess, BindProcess],
}

export default hdConfig
