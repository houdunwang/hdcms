import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'admin.index': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'authorize': { paramsTuple?: []; params?: {} }
    'binds.email': { paramsTuple?: []; params?: {} }
    'binds.mobile': { paramsTuple?: []; params?: {} }
    'captcha': { paramsTuple?: []; params?: {} }
    'codes.email': { paramsTuple?: []; params?: {} }
    'codes.mobile': { paramsTuple?: []; params?: {} }
    'configs.all': { paramsTuple?: []; params?: {} }
    'configs.common': { paramsTuple?: []; params?: {} }
    'configs.store': { paramsTuple?: []; params?: {} }
    'find_passwords.email': { paramsTuple?: []; params?: {} }
    'find_passwords.mobile': { paramsTuple?: []; params?: {} }
    'logs.index': { paramsTuple?: []; params?: {} }
    'orders.index': { paramsTuple?: []; params?: {} }
    'package.index': { paramsTuple?: []; params?: {} }
    'package.store': { paramsTuple?: []; params?: {} }
    'package.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'package.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'package.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pays.wepay': { paramsTuple?: []; params?: {} }
    'pays.wepay_check': { paramsTuple?: []; params?: {} }
    'pay.notify': { paramsTuple?: []; params?: {} }
    'subscribe.index': { paramsTuple?: []; params?: {} }
    'subscribe.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'system.restart': { paramsTuple?: []; params?: {} }
    'uploads.file': { paramsTuple?: []; params?: {} }
    'uploads.image': { paramsTuple?: []; params?: {} }
    'users.profile': { paramsTuple?: []; params?: {} }
    'users.password': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wechats_message': { paramsTuple?: []; params?: {} }
    'wechat_qrs.create': { paramsTuple?: []; params?: {} }
    'wechat_login.login': { paramsTuple?: []; params?: {} }
    'wechat_bind.bind': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'admin.index': { paramsTuple?: []; params?: {} }
    'captcha': { paramsTuple?: []; params?: {} }
    'configs.all': { paramsTuple?: []; params?: {} }
    'configs.common': { paramsTuple?: []; params?: {} }
    'logs.index': { paramsTuple?: []; params?: {} }
    'orders.index': { paramsTuple?: []; params?: {} }
    'package.index': { paramsTuple?: []; params?: {} }
    'package.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subscribe.index': { paramsTuple?: []; params?: {} }
    'subscribe.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.profile': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wechats_message': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'admin.index': { paramsTuple?: []; params?: {} }
    'captcha': { paramsTuple?: []; params?: {} }
    'configs.all': { paramsTuple?: []; params?: {} }
    'configs.common': { paramsTuple?: []; params?: {} }
    'logs.index': { paramsTuple?: []; params?: {} }
    'orders.index': { paramsTuple?: []; params?: {} }
    'package.index': { paramsTuple?: []; params?: {} }
    'package.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subscribe.index': { paramsTuple?: []; params?: {} }
    'subscribe.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.profile': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wechats_message': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'authorize': { paramsTuple?: []; params?: {} }
    'binds.email': { paramsTuple?: []; params?: {} }
    'binds.mobile': { paramsTuple?: []; params?: {} }
    'codes.email': { paramsTuple?: []; params?: {} }
    'codes.mobile': { paramsTuple?: []; params?: {} }
    'configs.store': { paramsTuple?: []; params?: {} }
    'find_passwords.email': { paramsTuple?: []; params?: {} }
    'find_passwords.mobile': { paramsTuple?: []; params?: {} }
    'package.store': { paramsTuple?: []; params?: {} }
    'pays.wepay': { paramsTuple?: []; params?: {} }
    'pays.wepay_check': { paramsTuple?: []; params?: {} }
    'pay.notify': { paramsTuple?: []; params?: {} }
    'system.restart': { paramsTuple?: []; params?: {} }
    'uploads.file': { paramsTuple?: []; params?: {} }
    'uploads.image': { paramsTuple?: []; params?: {} }
    'wechats_message': { paramsTuple?: []; params?: {} }
    'wechat_qrs.create': { paramsTuple?: []; params?: {} }
    'wechat_login.login': { paramsTuple?: []; params?: {} }
    'wechat_bind.bind': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'package.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.password': { paramsTuple?: []; params?: {} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wechats_message': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'package.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wechats_message': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'package.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wechats_message': { paramsTuple?: []; params?: {} }
  }
  OPTIONS: {
    'wechats_message': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}