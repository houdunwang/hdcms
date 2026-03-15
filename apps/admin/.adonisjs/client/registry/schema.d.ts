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
  'admin': {
    methods: ["GET","HEAD"]
    pattern: '/core/admin'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/admin_controller').default['handle']>>>
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
  'binds.email': {
    methods: ["POST"]
    pattern: '/core/bind/email'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/bind').bindEmailValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/bind').bindEmailValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/binds_controller').default['email']>>>
    }
  }
  'binds.mobile': {
    methods: ["POST"]
    pattern: '/core/bind/mobile'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/bind').bindMobileValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/bind').bindMobileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/binds_controller').default['mobile']>>>
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
  'codes.email': {
    methods: ["POST"]
    pattern: '/core/code/email'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/code').sendEmailCodeValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/code').sendEmailCodeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/codes_controller').default['email']>>>
    }
  }
  'codes.mobile': {
    methods: ["POST"]
    pattern: '/core/code/mobile'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/code').sendMobileCodeValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/code').sendMobileCodeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/codes_controller').default['mobile']>>>
    }
  }
  'find_passwords.email': {
    methods: ["POST"]
    pattern: '/core/findPassword/email'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/findPassword').findPasswordByEmailValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/findPassword').findPasswordByEmailValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/find_passwords_controller').default['email']>>>
    }
  }
  'find_passwords.mobile': {
    methods: ["POST"]
    pattern: '/core/findPassword/mobile'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/findPassword').findPasswordByMobileValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/findPassword').findPasswordByMobileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/find_passwords_controller').default['mobile']>>>
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
    methods: ["GET","HEAD"]
    pattern: '/core/order/index'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/orders_controller').default['index']>>>
    }
  }
  'package.index': {
    methods: ["GET","HEAD"]
    pattern: '/core/package'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/packages_controller').default['index']>>>
    }
  }
  'package.store': {
    methods: ["POST"]
    pattern: '/core/package'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/package').packageValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/package').packageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/packages_controller').default['store']>>>
    }
  }
  'package.show': {
    methods: ["GET","HEAD"]
    pattern: '/core/package/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/packages_controller').default['show']>>>
    }
  }
  'package.update': {
    methods: ["PUT","PATCH"]
    pattern: '/core/package/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/package').packageValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#core/validators/package').packageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/packages_controller').default['update']>>>
    }
  }
  'package.destroy': {
    methods: ["DELETE"]
    pattern: '/core/package/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/packages_controller').default['destroy']>>>
    }
  }
  'pays.wepay': {
    methods: ["POST"]
    pattern: '/core/pay/wepay'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/pay').payValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/pay').payValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/pays_controller').default['wepay']>>>
    }
  }
  'pays.wepay_check': {
    methods: ["POST"]
    pattern: '/core/pay/wepay/check'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/pay').payCheckValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/pay').payCheckValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/pays_controller').default['wepayCheck']>>>
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
  'subscribe.index': {
    methods: ["GET","HEAD"]
    pattern: '/core/subscribe'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/subscribes_controller').default['index']>>>
    }
  }
  'subscribe.store': {
    methods: ["POST"]
    pattern: '/core/subscribe'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/subscribes_controller').default['store']>>>
    }
  }
  'subscribe.show': {
    methods: ["GET","HEAD"]
    pattern: '/core/subscribe/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/subscribes_controller').default['show']>>>
    }
  }
  'subscribe.update': {
    methods: ["PUT","PATCH"]
    pattern: '/core/subscribe/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/subscribes_controller').default['update']>>>
    }
  }
  'subscribe.destroy': {
    methods: ["DELETE"]
    pattern: '/core/subscribe/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/subscribes_controller').default['destroy']>>>
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
  'uploads.file': {
    methods: ["POST"]
    pattern: '/core/upload/file'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/uploads_controller').default['file']>>>
    }
  }
  'uploads.image_single': {
    methods: ["POST"]
    pattern: '/core/upload/imageSingle'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/upload').uploadImageSingleValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/upload').uploadImageSingleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/uploads_controller').default['imageSingle']>>>
    }
  }
  'users.profile': {
    methods: ["GET","HEAD"]
    pattern: '/core/users/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['profile']>>>
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
    pattern: '/core/users/destroy'
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
  'wechats_message': {
    methods: ["HEAD","OPTIONS","GET","POST","PUT","PATCH","DELETE"]
    pattern: '/core/wechat/message'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/wechat/wechats_message_controller').default['handle']>>>
    }
  }
  'wechat_qrs.create': {
    methods: ["POST"]
    pattern: '/core/wechat/createQr'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/wechat/wechat_qrs_controller').default['create']>>>
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
  'wechat_bind.bind': {
    methods: ["POST"]
    pattern: '/core/wechat/bind'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/wechat/wechat_bind_controller').default['bind']>>>
    }
  }
}
