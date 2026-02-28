/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  auth: {
    login: typeof routes['auth.login']
    register: typeof routes['auth.register']
    logout: typeof routes['auth.logout']
    findPassword: typeof routes['auth.find_password']
  }
  captcha: typeof routes['captcha']
  codes: {
    send: typeof routes['codes.send']
  }
  licenses: typeof routes['licenses']
  orders: {
    index: typeof routes['orders.index']
  }
  pays: typeof routes['pays']
  pay: {
    notify: typeof routes['pay.notify']
  }
  system: {
    restart: typeof routes['system.restart']
  }
  uploads: typeof routes['uploads']
  users: {
    password: typeof routes['users.password']
    me: typeof routes['users.me']
    index: typeof routes['users.index']
    store: typeof routes['users.store']
    show: typeof routes['users.show']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
  }
  wechats: typeof routes['wechats']
  wechatLogin: {
    loginQrCode: typeof routes['wechat_login.login_qr_code']
    login: typeof routes['wechat_login.login']
  }
  bind: {
    loginQrCode: typeof routes['bind.login_qr_code']
    bind: typeof routes['bind.bind']
  }
}
