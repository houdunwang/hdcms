import Wechat from '../index.js'

export default class reply {
  /**
   * 构造函数
   * @param wechat Wechat 实例
   */
  constructor(protected wechat: Wechat) { }

  /**
   * 构建基本消息结构
   * @param type 消息类型
   * @param content 消息内容
   * @returns XML 格式的字符串
   */
  private base(type: string, content: string) {
    return `
      <xml>
        <ToUserName><![CDATA[${this.wechat.message?.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${this.wechat.message?.ToUserName}]]></FromUserName>
        <CreateTime>${Math.floor(Date.now() / 1000)}</CreateTime>
        <MsgType><![CDATA[${type}]]></MsgType>
        ${content}
      </xml>`
  }

  /**
   * 回复文本消息
   * @param content 回复的文本内容
   */
  text(content: string) {
    return this.base('text', `<Content><![CDATA[${content}]]></Content>`)
  }

  /**
   * 回复图片消息
   * @param mediaId 通过素材管理中的接口上传多媒体文件，得到的 id
   */
  image(mediaId: string) {
    return this.base('image', `<Image><MediaId><![CDATA[${mediaId}]]></MediaId></Image>`)
  }

  /**
   * 回复语音消息
   * @param mediaId 通过素材管理中的接口上传多媒体文件，得到的 id
   */
  voice(mediaId: string) {
    return this.base('voice', `<Voice><MediaId><![CDATA[${mediaId}]]></MediaId></Voice>`)
  }

  /**
   * 回复视频消息
   * @param mediaId 通过素材管理中的接口上传多媒体文件，得到的 id
   * @param title 视频消息的标题
   * @param description 视频消息的描述
   */
  video(mediaId: string, title = '', description = '') {
    return this.base(
      'video',
      `<Video>
        <MediaId><![CDATA[${mediaId}]]></MediaId>
        <Title><![CDATA[${title}]]></Title>
        <Description><![CDATA[${description}]]></Description>
      </Video>`
    )
  }

  /**
   * 回复音乐消息
   * @param thumbMediaId 缩略图的媒体 id，通过素材管理中的接口上传多媒体文件，得到的 id
   * @param musicUrl 音乐链接
   * @param hqMusicUrl 高质量音乐链接，WIFI 环境优先使用该链接播放音乐
   * @param title 音乐标题
   * @param description 音乐描述
   */
  music(thumbMediaId: string, musicUrl = '', hqMusicUrl = '', title = '', description = '') {
    return this.base(
      'music',
      `<Music>
        <Title><![CDATA[${title}]]></Title>
        <Description><![CDATA[${description}]]></Description>
        <MusicUrl><![CDATA[${musicUrl}]]></MusicUrl>
        <HQMusicUrl><![CDATA[${hqMusicUrl}]]></HQMusicUrl>
        <ThumbMediaId><![CDATA[${thumbMediaId}]]></ThumbMediaId>
      </Music>`
    )
  }

  /**
   * 回复图文消息
   * @param articles 图文消息列表
   */
  news(articles: { title: string; description: string; picUrl: string; url: string }[]) {
    const items = articles
      .map(
        (article) => `
      <item>
        <Title><![CDATA[${article.title}]]></Title>
        <Description><![CDATA[${article.description}]]></Description>
        <PicUrl><![CDATA[${article.picUrl}]]></PicUrl>
        <Url><![CDATA[${article.url}]]></Url>
      </item>`
      )
      .join('')

    return this.base(
      'news',
      `<ArticleCount>${articles.length}</ArticleCount>
      <Articles>${items}</Articles>`
    )
  }

  /**
   * 将消息转发到多客服
   */
  transferCustomerService() {
    return this.base('transfer_customer_service', '')
  }
}
