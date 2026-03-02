/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'drive.fs.serve': {
    methods: ["GET","HEAD"]
    pattern: '/uploads/*'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'auth.login': {
    methods: ["POST"]
    pattern: '/core/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/auth').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/auth').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/auth_controller').default['login']>>>
    }
  }
  'auth.register': {
    methods: ["POST"]
    pattern: '/core/register'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/auth').registerValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/auth').registerValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/auth_controller').default['register']>>>
    }
  }
  'auth.logout': {
    methods: ["POST"]
    pattern: '/core/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/auth_controller').default['logout']>>>
    }
  }
  'auth.find_password': {
    methods: ["POST"]
    pattern: '/core/findPassword'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/auth').findPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/auth').findPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/auth_controller').default['findPassword']>>>
    }
  }
  'captcha': {
    methods: ["GET","HEAD"]
    pattern: '/core/captcha'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/captcha_controller').default['handle']>>>
    }
  }
  'codes.send': {
    methods: ["POST"]
    pattern: '/core/code/sendCode'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/code').sendCodeValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/code').sendCodeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/codes_controller').default['send']>>>
    }
  }
  'licenses': {
    methods: ["POST"]
    pattern: '/core/license/check'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/licenses_controller').default['handle']>>>
    }
  }
  'logs': {
    methods: ["GET","HEAD"]
    pattern: '/core/logs'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/logs_controller').default['handle']>>>
    }
  }
  'orders.index': {
    methods: ["POST"]
    pattern: '/core/order/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/orders_controller').default['index']>>>
    }
  }
  'pays': {
    methods: ["POST"]
    pattern: '/core/pay'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/pay').payValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/pay').payValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/pays_controller').default['handle']>>>
    }
  }
  'pay.notify': {
    methods: ["POST"]
    pattern: '/core/pay/notify'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/pays_controller').default['notify']>>>
    }
  }
  'system.restart': {
    methods: ["POST"]
    pattern: '/core/restart'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/systems_controller').default['restart']>>>
    }
  }
  'uploads': {
    methods: ["POST"]
    pattern: '/core/upload'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/uploads_controller').default['handle']>>>
    }
  }
  'users.password': {
    methods: ["PUT"]
    pattern: '/core/users/password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/user').updatePasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/user').updatePasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['password']>>>
    }
  }
  'users.me': {
    methods: ["GET","HEAD"]
    pattern: '/core/users/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['me']>>>
    }
  }
  'users.avatar': {
    methods: ["POST"]
    pattern: '/core/users/avatar'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['avatar']>>>
    }
  }
  'users.update': {
    methods: ["PUT"]
    pattern: '/core/users/:id?'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/user').updateUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/user').updateUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['update']>>>
    }
  }
  'users.destroy': {
    methods: ["DELETE"]
    pattern: '/core/users/:id?'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['destroy']>>>
    }
  }
  'users.index': {
    methods: ["GET","HEAD"]
    pattern: '/core/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['index']>>>
    }
  }
  'users.store': {
    methods: ["POST"]
    pattern: '/core/users'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/user').createUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/user').createUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['store']>>>
    }
  }
  'users.show': {
    methods: ["GET","HEAD"]
    pattern: '/core/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['show']>>>
    }
  }
  'wechats': {
    methods: ["HEAD","OPTIONS","GET","POST","PUT","PATCH","DELETE"]
    pattern: '/core/wechat'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/wechat/wechats_controller').default['handle']>>>
    }
  }
  'wechat_login.login_qr_code': {
    methods: ["GET","HEAD"]
    pattern: '/core/wechat/login/qr'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/wechat/wechat_login_controller').default['loginQrCode']>>>
    }
  }
  'wechat_login.login': {
    methods: ["POST"]
    pattern: '/core/wechat/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/wechat/wechat_login_controller').default['login']>>>
    }
  }
  'bind.login_qr_code': {
    methods: ["POST"]
    pattern: '/core/wechat/bind/qr'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/wechat/bind_controller').default['loginQrCode']>>>
    }
  }
  'bind.bind': {
    methods: ["POST"]
    pattern: '/core/wechat/bind'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/wechat/bind_controller').default['bind']>>>
    }
  }
}
