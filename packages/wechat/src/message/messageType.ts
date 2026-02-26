import {
  IEventMessage,
  IImageMessage,
  ILinkMessage,
  ILocationMessage,
  ITextMessage,
  IVideoMessage,
  IVoiceMessage,
  IWechatMessage,
} from '../types/message.js'

export interface Message {
  message: IWechatMessage
}

export abstract class MessageType {

  abstract message: IWechatMessage

  /**
   * 是否是文本消息
   */
  isText(): this is this & { message: ITextMessage } {
    return this.message?.MsgType === 'text'
  }

  /**
   * 是否是图片消息
   */
  isImage(): this is this & { message: IImageMessage } {
    return this.message?.MsgType === 'image'
  }

  /**
   * 是否是语音消息
   */
  isVoice(): this is this & { message: IVoiceMessage } {
    return this.message?.MsgType === 'voice'
  }

  /**
   * 是否是视频消息
   */
  isVideo(): this is this & { message: IVideoMessage } {
    return this.message?.MsgType === 'video'
  }

  /**
   * 是否是小视频消息
   */
  isShortVideo(): this is this & { message: IVideoMessage } {
    return this.message?.MsgType === 'shortvideo'
  }

  /**
   * 是否是地理位置消息
   */
  isLocation(): this is this & { message: ILocationMessage } {
    return this.message?.MsgType === 'location'
  }

  /**
   * 是否是链接消息
   */
  isLink(): this is this & { message: ILinkMessage } {
    return this.message?.MsgType === 'link'
  }

  /**
   * 是否是事件消息
   */
  isEvent(): this is this & { message: IEventMessage } {
    return this.message?.MsgType === 'event'
  }

  /**
   * 是否是关注事件
   */
  isSubscribe(): this is this & { message: IEventMessage & { Event: 'subscribe' } } {
    return this.isEvent() && this.message?.Event === 'subscribe'
  }

  /**
   * 是否是取消关注事件
   */
  isUnsubscribe(): this is this & { message: IEventMessage & { Event: 'unsubscribe' } } {
    return this.isEvent() && this.message?.Event === 'unsubscribe'
  }

  /**
   * 是否是扫描带参数二维码事件
   */
  isScan(): this is this & { message: IEventMessage & { Event: 'SCAN' } } {
    return this.isEvent() && this.message?.Event === 'SCAN'
  }

  /**
   * 是否是上报地理位置事件
   */
  isLocationEvent(): this is this & { message: IEventMessage & { Event: 'LOCATION' } } {
    return this.isEvent() && this.message?.Event === 'LOCATION'
  }

  /**
   * 是否是自定义菜单事件
   */
  isClick(): this is this & { message: IEventMessage & { Event: 'CLICK' } } {
    return this.isEvent() && this.message?.Event === 'CLICK'
  }

  /**
   * 是否是点击菜单跳转链接时的事件
   */
  isView(): this is this & { message: IEventMessage & { Event: 'VIEW' } } {
    return this.isEvent() && this.message?.Event === 'VIEW'
  }

  /**
   * 是否是扫码推事件
   */
  isScanPush(): this is this & { message: IEventMessage & { Event: 'scancode_push' } } {
    return this.isEvent() && this.message?.Event === 'scancode_push'
  }

  /**
   * 是否是扫码推事件且弹出“消息接收中”提示框
   */
  isScanWait(): this is this & { message: IEventMessage & { Event: 'scancode_waitmsg' } } {
    return this.isEvent() && this.message?.Event === 'scancode_waitmsg'
  }

  /**
   * 是否是弹出系统拍照发图
   */
  isPicSysPhoto(): this is this & { message: IEventMessage & { Event: 'pic_sysphoto' } } {
    return this.isEvent() && this.message?.Event === 'pic_sysphoto'
  }

  /**
   * 是否是弹出拍照或者相册发图
   */
  isPicPhotoOrAlbum(): this is this & {
    message: IEventMessage & { Event: 'pic_photo_or_album' }
  } {
    return this.isEvent() && this.message?.Event === 'pic_photo_or_album'
  }

  /**
   * 是否是弹出微信相册发图器
   */
  isPicWeixin(): this is this & { message: IEventMessage & { Event: 'pic_weixin' } } {
    return this.isEvent() && this.message?.Event === 'pic_weixin'
  }

  /**
   * 是否是弹出地理位置选择器
   */
  isLocationSelect(): this is this & {
    message: IEventMessage & { Event: 'location_select' }
  } {
    return this.isEvent() && this.message?.Event === 'location_select'
  }
}
