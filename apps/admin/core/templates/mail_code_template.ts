export function emailVerificationTemplate(appName: string, code: string) {
  const year = new Date().getFullYear()
  return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f7f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f7f9; padding: 40px 0;">
            <tr>
                <td align="center">
                    <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                        <!-- Header -->
                        <tr>
                            <td align="center" style="padding: 40px 0 20px 0; border-bottom: 1px solid #f0f0f0;">
                                <h1 style="margin: 0; font-size: 24px; color: #1a73e8; font-weight: 600;">${appName}</h1>
                            </td>
                        </tr>
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 50px;">
                                <p style="margin: 0 0 20px 0; font-size: 16px; color: #333; line-height: 1.5;">您好！</p>
                                <p style="margin: 0 0 20px 0; font-size: 16px; color: #333; line-height: 1.5;">您正在进行身份验证，请使用下面的验证码完成操作：</p>
                                <div style="text-align: center; margin: 30px 0;">
                                    <div style="display: inline-block; padding: 15px 30px; background-color: #f8f9fa; border: 1px dashed #1a73e8; border-radius: 4px;">
                                        <span style="font-size: 32px; font-weight: bold; color: #1a73e8; letter-spacing: 5px; font-family: monospace;">${code}</span>
                                    </div>
                                </div>
                                <p style="margin: 0 0 10px 0; font-size: 14px; color: #666; line-height: 1.5;">提示：该验证码将在 <strong>10 分钟</strong>内有效。为了您的账户安全，请勿将验证码泄露给他人。</p>
                            </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td style="padding: 30px 50px; background-color: #fafafa; border-top: 1px solid #f0f0f0;">
                                <p style="margin: 0 0 10px 0; font-size: 12px; color: #999; line-height: 1.5; text-align: center;">
                                    如果您没有请求此验证码，请忽略此邮件。
                                </p>
                                <p style="margin: 0; font-size: 12px; color: #999; line-height: 1.5; text-align: center;">
                                    &copy; ${year} ${appName}. 保留所有权利。
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `
}
