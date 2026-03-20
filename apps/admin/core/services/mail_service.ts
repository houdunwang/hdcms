import mail from '@adonisjs/mail/services/main'

export class MailService {

  // 发送验证码
  async send(mailAddress: string, html: string) {
    await mail.send((message) => {
      message.to(mailAddress).subject('验证码').html(html)
    })
  }
}
