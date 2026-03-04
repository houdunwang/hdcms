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
  }
  binds: {
    email: typeof routes['binds.email']
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
  pays: typeof routes['pays']
  pay: {
    notify: typeof routes['pay.notify']
  }
  system: {
    restart: typeof routes['system.restart']
  }
  uploads: {
    file: typeof routes['uploads.file']
    imageSingle: typeof routes['uploads.image_single']
  }
  users: {
    password: typeof routes['users.password']
    me: typeof routes['users.me']
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
