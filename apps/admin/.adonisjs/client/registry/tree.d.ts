/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  admin: {
    index: typeof routes['admin.index']
  }
  auth: {
    register: typeof routes['auth.register']
    logout: typeof routes['auth.logout']
  }
  authorize: typeof routes['authorize']
  binds: {
    email: typeof routes['binds.email']
    mobile: typeof routes['binds.mobile']
  }
  captcha: typeof routes['captcha']
  codes: {
    email: typeof routes['codes.email']
    mobile: typeof routes['codes.mobile']
  }
  configs: {
    all: typeof routes['configs.all']
    common: typeof routes['configs.common']
    store: typeof routes['configs.store']
  }
  emails: {
    test: typeof routes['emails.test']
  }
  findPasswords: {
    email: typeof routes['find_passwords.email']
    mobile: typeof routes['find_passwords.mobile']
  }
  logs: {
    index: typeof routes['logs.index']
  }
  login: {
    name: typeof routes['login.name']
    email: typeof routes['login.email']
    mobile: typeof routes['login.mobile']
  }
  orders: {
    index: typeof routes['orders.index']
  }
  package: {
    index: typeof routes['package.index']
    store: typeof routes['package.store']
    show: typeof routes['package.show']
    update: typeof routes['package.update']
    destroy: typeof routes['package.destroy']
  }
  pays: {
    wepay: typeof routes['pays.wepay']
    wepayCheck: typeof routes['pays.wepay_check']
  }
  pay: {
    notify: typeof routes['pay.notify']
  }
  sms: {
    test: typeof routes['sms.test']
  }
  subscribe: {
    index: typeof routes['subscribe.index']
    show: typeof routes['subscribe.show']
  }
  system: {
    restart: typeof routes['system.restart']
  }
  uploads: {
    file: typeof routes['uploads.file']
    image: typeof routes['uploads.image']
  }
  users: {
    profile: typeof routes['users.profile']
    password: typeof routes['users.password']
    index: typeof routes['users.index']
    show: typeof routes['users.show']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
  }
  wechatsMessage: typeof routes['wechats_message']
  wechatQrs: {
    create: typeof routes['wechat_qrs.create']
  }
  wechatLogin: {
    login: typeof routes['wechat_login.login']
  }
  wechatBind: {
    bind: typeof routes['wechat_bind.bind']
  }
}
