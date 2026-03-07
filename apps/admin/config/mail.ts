import env from '#start/env'
import { defineConfig, transports } from '@adonisjs/mail'

const mailConfig = defineConfig({
  default: 'smtp',

  /**
   * The mailers object can be used to configure multiple mailers
   * each using a different transport or same transport with different
   * options.
   */
  from: {
    address: env.get('SMTP_USERNAME') ?? '',
    name: env.get('APP_NAME') ?? '',
  },

  /**
   * The globals are shared with all the templates rendered using the
   * configured template engine.
   *
   * This could be a nice place to define the logo URL, links base URL
   * the brand name to be used within the emails
   */
  globals: {
    brandName: 'Acme',
  },

  /**
   * The mailers object can be used to configure multiple mailers
   * each using a different transport or same transport with different
   * options.
   */
  mailers: {
    smtp: transports.smtp({
      host: env.get('SMTP_HOST') ?? '',
      port: env.get('SMTP_PORT') ?? 0,
      /**
       * Uncomment the auth block if your SMTP
       * server needs authentication
       */
      auth: {
        type: 'login',
        user: env.get('SMTP_USERNAME') ?? '',
        pass: env.get('SMTP_PASSWORD') ?? '',
      },
    }),
  },
})

export default mailConfig

declare module '@adonisjs/mail/types' {
  export interface MailersList extends InferMailers<typeof mailConfig> {}
}
