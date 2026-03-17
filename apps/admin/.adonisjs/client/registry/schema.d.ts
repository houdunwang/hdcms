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
  'users.test': {
    methods: ["GET","HEAD"]
    pattern: '/hd'
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
      response: unknown
    }
  }
  'auth.login': {
    methods: ["POST"]
    pattern: '/core/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'auth.register': {
    methods: ["POST"]
    pattern: '/core/register'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
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
      response: unknown
    }
  }
  'binds.email': {
    methods: ["POST"]
    pattern: '/core/bind/email'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'binds.mobile': {
    methods: ["POST"]
    pattern: '/core/bind/mobile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
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
      response: unknown
    }
  }
  'codes.email': {
    methods: ["POST"]
    pattern: '/core/code/email'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'codes.mobile': {
    methods: ["POST"]
    pattern: '/core/code/mobile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'find_passwords.email': {
    methods: ["POST"]
    pattern: '/core/findPassword/email'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'find_passwords.mobile': {
    methods: ["POST"]
    pattern: '/core/findPassword/mobile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
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
      response: unknown
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
      response: unknown
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
      response: unknown
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
      response: unknown
    }
  }
  'package.store': {
    methods: ["POST"]
    pattern: '/core/package'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
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
      response: unknown
    }
  }
  'package.update': {
    methods: ["PUT","PATCH"]
    pattern: '/core/package/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
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
      response: unknown
    }
  }
  'pays.wepay': {
    methods: ["POST"]
    pattern: '/core/pay/wepay'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'pays.wepay_check': {
    methods: ["POST"]
    pattern: '/core/pay/wepay/check'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
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
      response: unknown
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
      response: unknown
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
      response: unknown
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
      response: unknown
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
      response: unknown
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
      response: unknown
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
      response: unknown
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
      response: unknown
    }
  }
  'uploads.image_single': {
    methods: ["POST"]
    pattern: '/core/upload/imageSingle'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
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
      response: unknown
    }
  }
  'users.password': {
    methods: ["PUT"]
    pattern: '/core/users/password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'users.update': {
    methods: ["PUT"]
    pattern: '/core/users/:id?'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
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
      response: unknown
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
      response: unknown
    }
  }
  'users.store': {
    methods: ["POST"]
    pattern: '/core/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
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
      response: unknown
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
      response: unknown
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
      response: unknown
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
      response: unknown
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
      response: unknown
    }
  }
}
