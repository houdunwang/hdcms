import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.find_password': { paramsTuple?: []; params?: {} }
    'captcha': { paramsTuple?: []; params?: {} }
    'codes.send': { paramsTuple?: []; params?: {} }
    'licenses': { paramsTuple?: []; params?: {} }
    'logs': { paramsTuple?: []; params?: {} }
    'orders.index': { paramsTuple?: []; params?: {} }
    'pays': { paramsTuple?: []; params?: {} }
    'pay.notify': { paramsTuple?: []; params?: {} }
    'system.restart': { paramsTuple?: []; params?: {} }
    'uploads.file': { paramsTuple?: []; params?: {} }
    'uploads.image_single': { paramsTuple?: []; params?: {} }
    'users.password': { paramsTuple?: []; params?: {} }
    'users.me': { paramsTuple?: []; params?: {} }
    'users.update': { paramsTuple?: [ParamValue?]; params?: {'id'?: ParamValue} }
    'users.destroy': { paramsTuple?: [ParamValue?]; params?: {'id'?: ParamValue} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wechats_message': { paramsTuple?: []; params?: {} }
    'wechat_login.login_qr_code': { paramsTuple?: []; params?: {} }
    'wechat_login.login': { paramsTuple?: []; params?: {} }
    'wechat_bind.login_qr_code': { paramsTuple?: []; params?: {} }
    'wechat_bind.bind': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'captcha': { paramsTuple?: []; params?: {} }
    'logs': { paramsTuple?: []; params?: {} }
    'users.me': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wechats_message': { paramsTuple?: []; params?: {} }
    'wechat_login.login_qr_code': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'captcha': { paramsTuple?: []; params?: {} }
    'logs': { paramsTuple?: []; params?: {} }
    'users.me': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wechats_message': { paramsTuple?: []; params?: {} }
    'wechat_login.login_qr_code': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.find_password': { paramsTuple?: []; params?: {} }
    'codes.send': { paramsTuple?: []; params?: {} }
    'licenses': { paramsTuple?: []; params?: {} }
    'orders.index': { paramsTuple?: []; params?: {} }
    'pays': { paramsTuple?: []; params?: {} }
    'pay.notify': { paramsTuple?: []; params?: {} }
    'system.restart': { paramsTuple?: []; params?: {} }
    'uploads.file': { paramsTuple?: []; params?: {} }
    'uploads.image_single': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'wechats_message': { paramsTuple?: []; params?: {} }
    'wechat_login.login': { paramsTuple?: []; params?: {} }
    'wechat_bind.login_qr_code': { paramsTuple?: []; params?: {} }
    'wechat_bind.bind': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'users.password': { paramsTuple?: []; params?: {} }
    'users.update': { paramsTuple?: [ParamValue?]; params?: {'id'?: ParamValue} }
    'wechats_message': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'users.destroy': { paramsTuple?: [ParamValue?]; params?: {'id'?: ParamValue} }
    'wechats_message': { paramsTuple?: []; params?: {} }
  }
  OPTIONS: {
    'wechats_message': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'wechats_message': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}