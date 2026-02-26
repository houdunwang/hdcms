import { XMLParser } from 'fast-xml-parser'
import { createHash } from 'node:crypto'
import { MessageType } from './message/messageType.js'
import reply from './message/reply.js'
import Qr from './qr/index.js'
import { IConfig } from './types/config.js'
import { IWechatMessage } from './types/message.js'
import { UserInfo } from './user/info.js'

/**
 * 全局缓存的 access_token
 */
let cachedToken: string = ''
/**
 * access_token 的过期时间戳
 */
let tokenExpiresAt: number = 0

export class Wechat extends MessageType {

  public wechatHost = 'https://api.weixin.qq.com/cgi-bin'

  public accessToken: string = ''
  /**
   * 微信服务器发送的原始消息
   */
  public override message: IWechatMessage = undefined!
  /**
   * 微信公众号配置
   */
  public config: IConfig = {}
  /**
   * 微信服务
   */
  public services = {
    reply: new reply(this),
    userInfo: new UserInfo(this),
    qr: new Qr(this)
  }


  /**
   * 初始化配置
   * @param config 配置对象
   */
  public async init(config: IConfig) {
    this.config = config
    await this.getAccessToken()
  }

  /**
   * 解析微信服务器发送的 XML 数据
   * @param raw XML 原始数据
   */
  public async parse(raw: string | null) {
    const parser = new XMLParser()
    const parseData = parser.parse(raw ?? '') as { xml: IWechatMessage }
    const data = parseData.xml
    this.message = data
  }

  /**
   * 验证微信服务器消息的真实性
   * @param signature 微信加密签名
   * @param timestamp 时间戳
   * @param nonce 随机数
   * @param token 开发者填写的token
   */
  public bind(query: Record<string, any>) {
    const { signature, timestamp, nonce, echostr } = query
    const token = this.config.token
    // 1. 将token、timestamp、nonce三个参数进行字典序排序
    const tmpArr = [token, timestamp, nonce].sort()

    // 2. 将三个参数字符串拼接成一个字符串进行sha1加密
    const tmpStr = tmpArr.join('')
    const sha1Str = createHash('sha1').update(tmpStr).digest('hex')
    // 3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (sha1Str !== signature) return false
    return echostr
  }

  private async getAccessToken() {
    if (cachedToken && Date.now() < tokenExpiresAt) {
      this.accessToken = cachedToken
      return this.accessToken
    }
    const { appid, secret } = this.config
    const res = await fetch(`${this.wechatHost}/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
    const data = await res.json()
    this.accessToken = data.access_token
    cachedToken = this.accessToken
    tokenExpiresAt = Date.now() + 7200 * 1000
    return this.accessToken
  }
}



export default Wechat
