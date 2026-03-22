/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  // Node
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PORT: Env.schema.number(),
  HOST: Env.schema.string({ format: 'host' }),
  LOG_LEVEL: Env.schema.string(),

  // App
  APP_KEY: Env.schema.secret(),
  APP_URL: Env.schema.string({ format: 'url', tld: false }),
  APP_NAME: Env.schema.string(),

  // Session
  SESSION_DRIVER: Env.schema.enum(['cookie', 'memory', 'database'] as const),

  /*
  |----------------------------------------------------------
  | Variables for configuring the limiter package
  |----------------------------------------------------------
  */
  LIMITER_STORE: Env.schema.enum(['database', 'memory'] as const),

  /*
  |----------------------------------------------------------
  | Variables for configuring the drive package
  |----------------------------------------------------------
  */
  DRIVE_DISK: Env.schema.enum(['fs'] as const),

  /*
  |----------------------------------------------------------
  | Variables for configuring the mail package
  |----------------------------------------------------------
  */
  MAIL_MAILER: Env.schema.enum(['smtp'] as const),
  MAIL_FROM_NAME: Env.schema.string(),
  MAIL_FROM_ADDRESS: Env.schema.string(),
  SMTP_HOST: Env.schema.string(),
  SMTP_PORT: Env.schema.number(),
  SMTP_USERNAME: Env.schema.string(),
  SMTP_PASSWORD: Env.schema.string(),
  SMTP_SECURE: Env.schema.boolean.optional(),


  /*
  |----------------------------------------------------------
  | 阿里云
  |----------------------------------------------------------
  */
  ALIYUN_ACCESS_KEY_ID: Env.schema.string.optional(),
  ALIYUN_ACCESS_KEY_SECRET: Env.schema.string.optional(),
  ALIYUN_SMS_CODE_SIGN: Env.schema.string.optional(),
  ALIYUN_SMS_CODE_TEMPLATE: Env.schema.string.optional(),

  // 测试数据
  TEST_USER_EMAIL: Env.schema.string.optional({ format: 'email' }),
  TEST_USER_MOBILE: Env.schema.string.optional(),

  // 微信公众号
  WECHAT_APP_ID: Env.schema.string.optional(),
  WECHAT_APP_SECRET: Env.schema.string.optional(),
  WECHAT_TOKEN: Env.schema.string.optional(),
  WECHAT_DEFAULT_REPLY: Env.schema.string.optional(),

  // 文件上传
  UPLOAD_DRIVER: Env.schema.enum(['oss', 'local'] as const),
  UPLOAD_OSS_REGION: Env.schema.string.optional(),
  UPLOAD_OSS_BUCKET: Env.schema.string.optional(),
  UPLOAD_OSS_ENDPOINT: Env.schema.string.optional(),
})
