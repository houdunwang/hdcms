/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  admin: typeof routes['admin']
  auth: {
    login: typeof routes['auth.login']
    register: typeof routes['auth.register']
    logout: typeof routes['auth.logout']
  }
  binds: {
    email: typeof routes['binds.email']
    mobile: typeof routes['binds.mobile']
  }
  captcha: typeof routes['captcha']
  codes: {
    email: typeof routes['codes.email']
    mobile: typeof routes['codes.mobile']
  }
  findPasswords: {
    email: typeof routes['find_passwords.email']
    mobile: typeof routes['find_passwords.mobile']
  }
  licenses: typeof routes['licenses']
  logs: typeof routes['logs']
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
  subscribe: {
    index: typeof routes['subscribe.index']
    store: typeof routes['subscribe.store']
    show: typeof routes['subscribe.show']
    update: typeof routes['subscribe.update']
    destroy: typeof routes['subscribe.destroy']
  }
  system: {
    restart: typeof routes['system.restart']
  }
  uploads: {
    file: typeof routes['uploads.file']
    imageSingle: typeof routes['uploads.image_single']
  }
  users: {
    profile: typeof routes['users.profile']
    password: typeof routes['users.password']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
    index: typeof routes['users.index']
    store: typeof routes['users.store']
    show: typeof routes['users.show']
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
