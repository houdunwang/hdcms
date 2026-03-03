import env from "#start/env";
import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import Wechat from "@hd/wechat";

@inject()
export class WechatService {
  constructor(public wechat: Wechat, protected ctx: HttpContext) {
  }

  public async init() {
    const config = {
      token: env.get('WECHAT_TOKEN'),
      appid: env.get('WECHAT_APP_ID'),
      secret: env.get('WECHAT_APP_SECRET'),
    };
    await this.wechat.init(config)
    this.wechat.parse(this.ctx.request.raw())
  }

  public bind() {
    return this.wechat.bind(this.ctx.request.qs())
  }
}