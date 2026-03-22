/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'drive.fs.serve': {
    methods: ["GET","HEAD"]
    pattern: '/uploads/*'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { '*': ParamValue[] }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.index': {
    methods: ["GET","HEAD"]
    pattern: '/core/admin'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/auth_controller').default['register']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/auth_controller').default['logout']>>>
    }
  }
  'authorize': {
    methods: ["POST"]
    pattern: '/core/authorize'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/authorize_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/authorize_controller').default['handle']>>>
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/binds_controller').default['email']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/binds_controller').default['mobile']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/captcha_controller').default['handle']>>>
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/codes_controller').default['email']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/codes_controller').default['mobile']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'configs.all': {
    methods: ["GET","HEAD"]
    pattern: '/core/configs/all'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/configs_controller').default['all']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/configs_controller').default['all']>>>
    }
  }
  'configs.common': {
    methods: ["GET","HEAD"]
    pattern: '/core/configs/common'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/configs_controller').default['common']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/configs_controller').default['common']>>>
    }
  }
  'configs.store': {
    methods: ["POST"]
    pattern: '/core/configs/store'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/configs_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/configs_controller').default['store']>>>
    }
  }
  'emails.test': {
    methods: ["POST"]
    pattern: '/core/email/test'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/email').testEmailValidate)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/email').testEmailValidate)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/emails_controller').default['test']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/emails_controller').default['test']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/find_passwords_controller').default['email']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/find_passwords_controller').default['mobile']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'logs.index': {
    methods: ["GET","HEAD"]
    pattern: '/core/logs'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/logs_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/logs_controller').default['index']>>>
    }
  }
  'login.name': {
    methods: ["POST"]
    pattern: '/core/login/name'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/login').nameLoginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/login').nameLoginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/login_controller').default['name']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/login_controller').default['name']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'login.email': {
    methods: ["POST"]
    pattern: '/core/login/email'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/login').emailLoginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/login').emailLoginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/login_controller').default['email']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/login_controller').default['email']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'login.mobile': {
    methods: ["POST"]
    pattern: '/core/login/mobile'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/login').mobileLoginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/login').mobileLoginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/login_controller').default['mobile']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/login_controller').default['mobile']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'orders.index': {
    methods: ["GET","HEAD"]
    pattern: '/core/order'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/orders_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/orders_controller').default['index']>>>
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/packages_controller').default['index']>>>
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/packages_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/packages_controller').default['show']>>>
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/packages_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/packages_controller').default['destroy']>>>
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/pays_controller').default['wepay']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/pays_controller').default['wepayCheck']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/pays_controller').default['notify']>>>
    }
  }
  'sms.test': {
    methods: ["POST"]
    pattern: '/core/sms/test'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/sms').testSmsValidate)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/sms').testSmsValidate)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/sms_controller').default['test']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/sms_controller').default['test']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/subscribes_controller').default['index']>>>
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/subscribes_controller').default['show']>>>
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/systems_controller').default['restart']>>>
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/uploads_controller').default['file']>>>
    }
  }
  'uploads.image': {
    methods: ["POST"]
    pattern: '/core/upload/image'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/upload').uploadImageSingleValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#core/validators/upload').uploadImageSingleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/uploads_controller').default['image']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/uploads_controller').default['image']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['profile']>>>
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['password']>>> | { status: 422; response: { errors: SimpleError[] } }
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['index']>>>
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['show']>>>
    }
  }
  'users.update': {
    methods: ["PUT","PATCH"]
    pattern: '/core/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#core/validators/user').updateUserValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#core/validators/user').updateUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.destroy': {
    methods: ["DELETE"]
    pattern: '/core/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/controllers/users_controller').default['destroy']>>>
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/wechat/wechats_message_controller').default['handle']>>>
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/wechat/wechat_qrs_controller').default['create']>>>
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/wechat/wechat_login_controller').default['login']>>>
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
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#core/wechat/wechat_bind_controller').default['bind']>>>
    }
  }
}
