/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'drive.fs.serve': {
    methods: ["GET","HEAD"],
    pattern: '/uploads/*',
    tokens: [{"old":"/uploads/*","type":0,"val":"uploads","end":""},{"old":"/uploads/*","type":2,"val":"*","end":""}],
    types: placeholder as Registry['drive.fs.serve']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/core/login',
    tokens: [{"old":"/core/login","type":0,"val":"core","end":""},{"old":"/core/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.register': {
    methods: ["POST"],
    pattern: '/core/register',
    tokens: [{"old":"/core/register","type":0,"val":"core","end":""},{"old":"/core/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/core/logout',
    tokens: [{"old":"/core/logout","type":0,"val":"core","end":""},{"old":"/core/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'binds.email': {
    methods: ["POST"],
    pattern: '/core/bind/email',
    tokens: [{"old":"/core/bind/email","type":0,"val":"core","end":""},{"old":"/core/bind/email","type":0,"val":"bind","end":""},{"old":"/core/bind/email","type":0,"val":"email","end":""}],
    types: placeholder as Registry['binds.email']['types'],
  },
  'binds.mobile': {
    methods: ["POST"],
    pattern: '/core/bind/mobile',
    tokens: [{"old":"/core/bind/mobile","type":0,"val":"core","end":""},{"old":"/core/bind/mobile","type":0,"val":"bind","end":""},{"old":"/core/bind/mobile","type":0,"val":"mobile","end":""}],
    types: placeholder as Registry['binds.mobile']['types'],
  },
  'captcha': {
    methods: ["GET","HEAD"],
    pattern: '/core/captcha',
    tokens: [{"old":"/core/captcha","type":0,"val":"core","end":""},{"old":"/core/captcha","type":0,"val":"captcha","end":""}],
    types: placeholder as Registry['captcha']['types'],
  },
  'codes.email': {
    methods: ["POST"],
    pattern: '/core/code/email',
    tokens: [{"old":"/core/code/email","type":0,"val":"core","end":""},{"old":"/core/code/email","type":0,"val":"code","end":""},{"old":"/core/code/email","type":0,"val":"email","end":""}],
    types: placeholder as Registry['codes.email']['types'],
  },
  'codes.mobile': {
    methods: ["POST"],
    pattern: '/core/code/mobile',
    tokens: [{"old":"/core/code/mobile","type":0,"val":"core","end":""},{"old":"/core/code/mobile","type":0,"val":"code","end":""},{"old":"/core/code/mobile","type":0,"val":"mobile","end":""}],
    types: placeholder as Registry['codes.mobile']['types'],
  },
  'find_passwords.email': {
    methods: ["POST"],
    pattern: '/core/findPassword/email',
    tokens: [{"old":"/core/findPassword/email","type":0,"val":"core","end":""},{"old":"/core/findPassword/email","type":0,"val":"findPassword","end":""},{"old":"/core/findPassword/email","type":0,"val":"email","end":""}],
    types: placeholder as Registry['find_passwords.email']['types'],
  },
  'find_passwords.mobile': {
    methods: ["POST"],
    pattern: '/core/findPassword/mobile',
    tokens: [{"old":"/core/findPassword/mobile","type":0,"val":"core","end":""},{"old":"/core/findPassword/mobile","type":0,"val":"findPassword","end":""},{"old":"/core/findPassword/mobile","type":0,"val":"mobile","end":""}],
    types: placeholder as Registry['find_passwords.mobile']['types'],
  },
  'licenses': {
    methods: ["POST"],
    pattern: '/core/license/check',
    tokens: [{"old":"/core/license/check","type":0,"val":"core","end":""},{"old":"/core/license/check","type":0,"val":"license","end":""},{"old":"/core/license/check","type":0,"val":"check","end":""}],
    types: placeholder as Registry['licenses']['types'],
  },
  'logs': {
    methods: ["GET","HEAD"],
    pattern: '/core/logs',
    tokens: [{"old":"/core/logs","type":0,"val":"core","end":""},{"old":"/core/logs","type":0,"val":"logs","end":""}],
    types: placeholder as Registry['logs']['types'],
  },
  'orders.index': {
    methods: ["POST"],
    pattern: '/core/order/create',
    tokens: [{"old":"/core/order/create","type":0,"val":"core","end":""},{"old":"/core/order/create","type":0,"val":"order","end":""},{"old":"/core/order/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['orders.index']['types'],
  },
  'pays': {
    methods: ["POST"],
    pattern: '/core/pay',
    tokens: [{"old":"/core/pay","type":0,"val":"core","end":""},{"old":"/core/pay","type":0,"val":"pay","end":""}],
    types: placeholder as Registry['pays']['types'],
  },
  'pay.notify': {
    methods: ["POST"],
    pattern: '/core/pay/notify',
    tokens: [{"old":"/core/pay/notify","type":0,"val":"core","end":""},{"old":"/core/pay/notify","type":0,"val":"pay","end":""},{"old":"/core/pay/notify","type":0,"val":"notify","end":""}],
    types: placeholder as Registry['pay.notify']['types'],
  },
  'system.restart': {
    methods: ["POST"],
    pattern: '/core/restart',
    tokens: [{"old":"/core/restart","type":0,"val":"core","end":""},{"old":"/core/restart","type":0,"val":"restart","end":""}],
    types: placeholder as Registry['system.restart']['types'],
  },
  'uploads.file': {
    methods: ["POST"],
    pattern: '/core/upload/file',
    tokens: [{"old":"/core/upload/file","type":0,"val":"core","end":""},{"old":"/core/upload/file","type":0,"val":"upload","end":""},{"old":"/core/upload/file","type":0,"val":"file","end":""}],
    types: placeholder as Registry['uploads.file']['types'],
  },
  'uploads.image_single': {
    methods: ["POST"],
    pattern: '/core/upload/imageSingle',
    tokens: [{"old":"/core/upload/imageSingle","type":0,"val":"core","end":""},{"old":"/core/upload/imageSingle","type":0,"val":"upload","end":""},{"old":"/core/upload/imageSingle","type":0,"val":"imageSingle","end":""}],
    types: placeholder as Registry['uploads.image_single']['types'],
  },
  'users.password': {
    methods: ["PUT"],
    pattern: '/core/users/password',
    tokens: [{"old":"/core/users/password","type":0,"val":"core","end":""},{"old":"/core/users/password","type":0,"val":"users","end":""},{"old":"/core/users/password","type":0,"val":"password","end":""}],
    types: placeholder as Registry['users.password']['types'],
  },
  'users.me': {
    methods: ["GET","HEAD"],
    pattern: '/core/users/me',
    tokens: [{"old":"/core/users/me","type":0,"val":"core","end":""},{"old":"/core/users/me","type":0,"val":"users","end":""},{"old":"/core/users/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['users.me']['types'],
  },
  'users.update': {
    methods: ["PUT"],
    pattern: '/core/users/:id?',
    tokens: [{"old":"/core/users/:id?","type":0,"val":"core","end":""},{"old":"/core/users/:id?","type":0,"val":"users","end":""},{"old":"/core/users/:id?","type":3,"val":"id","end":""}],
    types: placeholder as Registry['users.update']['types'],
  },
  'users.destroy': {
    methods: ["DELETE"],
    pattern: '/core/users/destroy',
    tokens: [{"old":"/core/users/destroy","type":0,"val":"core","end":""},{"old":"/core/users/destroy","type":0,"val":"users","end":""},{"old":"/core/users/destroy","type":0,"val":"destroy","end":""}],
    types: placeholder as Registry['users.destroy']['types'],
  },
  'users.index': {
    methods: ["GET","HEAD"],
    pattern: '/core/users',
    tokens: [{"old":"/core/users","type":0,"val":"core","end":""},{"old":"/core/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.index']['types'],
  },
  'users.store': {
    methods: ["POST"],
    pattern: '/core/users',
    tokens: [{"old":"/core/users","type":0,"val":"core","end":""},{"old":"/core/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.store']['types'],
  },
  'users.show': {
    methods: ["GET","HEAD"],
    pattern: '/core/users/:id',
    tokens: [{"old":"/core/users/:id","type":0,"val":"core","end":""},{"old":"/core/users/:id","type":0,"val":"users","end":""},{"old":"/core/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.show']['types'],
  },
  'wechats_message': {
    methods: ["HEAD","OPTIONS","GET","POST","PUT","PATCH","DELETE"],
    pattern: '/core/wechat/message',
    tokens: [{"old":"/core/wechat/message","type":0,"val":"core","end":""},{"old":"/core/wechat/message","type":0,"val":"wechat","end":""},{"old":"/core/wechat/message","type":0,"val":"message","end":""}],
    types: placeholder as Registry['wechats_message']['types'],
  },
  'wechat_qrs.create': {
    methods: ["POST"],
    pattern: '/core/wechat/createQr',
    tokens: [{"old":"/core/wechat/createQr","type":0,"val":"core","end":""},{"old":"/core/wechat/createQr","type":0,"val":"wechat","end":""},{"old":"/core/wechat/createQr","type":0,"val":"createQr","end":""}],
    types: placeholder as Registry['wechat_qrs.create']['types'],
  },
  'wechat_login.login': {
    methods: ["POST"],
    pattern: '/core/wechat/login',
    tokens: [{"old":"/core/wechat/login","type":0,"val":"core","end":""},{"old":"/core/wechat/login","type":0,"val":"wechat","end":""},{"old":"/core/wechat/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['wechat_login.login']['types'],
  },
  'wechat_bind.bind': {
    methods: ["POST"],
    pattern: '/core/wechat/bind',
    tokens: [{"old":"/core/wechat/bind","type":0,"val":"core","end":""},{"old":"/core/wechat/bind","type":0,"val":"wechat","end":""},{"old":"/core/wechat/bind","type":0,"val":"bind","end":""}],
    types: placeholder as Registry['wechat_bind.bind']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
