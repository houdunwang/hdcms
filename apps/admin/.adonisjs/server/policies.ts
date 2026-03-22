export const policies = {
  EmailPolicy: () => import('#policies/email_policy'),
  SmsPolicy: () => import('#policies/sms_policy'),
}

