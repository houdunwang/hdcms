import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'captcha': { paramsTuple?: []; params?: {} }
    'codes.send': { paramsTuple?: []; params?: {} }
    'licenses': { paramsTuple?: []; params?: {} }
    'orders.index': { paramsTuple?: []; params?: {} }
    'pays': { paramsTuple?: []; params?: {} }
    'pay.notify': { paramsTuple?: []; params?: {} }
    'system.restart': { paramsTuple?: []; params?: {} }
    'uploads': { paramsTuple?: []; params?: {} }
    'users.password': { paramsTuple?: []; params?: {} }
    'users.me': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wechats': { paramsTuple?: []; params?: {} }
    'login.login_qr_code': { paramsTuple?: []; params?: {} }
    'login.login': { paramsTuple?: []; params?: {} }
    'bind.login_qr_code': { paramsTuple?: []; params?: {} }
    'bind.bind': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'captcha': { paramsTuple?: []; params?: {} }
    'users.me': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wechats': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'captcha': { paramsTuple?: []; params?: {} }
    'users.me': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wechats': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'codes.send': { paramsTuple?: []; params?: {} }
    'licenses': { paramsTuple?: []; params?: {} }
    'orders.index': { paramsTuple?: []; params?: {} }
    'pays': { paramsTuple?: []; params?: {} }
    'pay.notify': { paramsTuple?: []; params?: {} }
    'system.restart': { paramsTuple?: []; params?: {} }
    'uploads': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'wechats': { paramsTuple?: []; params?: {} }
    'login.login_qr_code': { paramsTuple?: []; params?: {} }
    'login.login': { paramsTuple?: []; params?: {} }
    'bind.login_qr_code': { paramsTuple?: []; params?: {} }
    'bind.bind': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'users.password': { paramsTuple?: []; params?: {} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wechats': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wechats': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wechats': { paramsTuple?: []; params?: {} }
  }
  OPTIONS: {
    'wechats': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}