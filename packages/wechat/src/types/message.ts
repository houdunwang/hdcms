
export interface IBaseMessage {
	ToUserName: string
	FromUserName: string
	CreateTime: number
	MsgType: 'text' | 'image' | 'voice' | 'video' | 'shortvideo' | 'location' | 'link' | 'event'
}

export interface ITextMessage extends IBaseMessage {
	MsgType: 'text'
	Content: string
	MsgId: number
}

export interface IImageMessage extends IBaseMessage {
	MsgType: 'image'
	PicUrl: string
	MediaId: string
	MsgId: number
}

export interface IVoiceMessage extends IBaseMessage {
	MsgType: 'voice'
	MediaId: string
	Format: string
	Recognition?: string
	MsgId: number
}

export interface IVideoMessage extends IBaseMessage {
	MsgType: 'video' | 'shortvideo'
	MediaId: string
	ThumbMediaId: string
	MsgId: number
}

export interface ILocationMessage extends IBaseMessage {
	MsgType: 'location'
	Location_X: string
	Location_Y: string
	Scale: string
	Label: string
	MsgId: number
}

export interface ILinkMessage extends IBaseMessage {
	MsgType: 'link'
	Title: string
	Description: string
	Url: string
	MsgId: number
}

export interface IEventMessage extends IBaseMessage {
	MsgType: 'event'
	Event:
	| 'subscribe'
	| 'unsubscribe'
	| 'SCAN'
	| 'LOCATION'
	| 'CLICK'
	| 'VIEW'
	| 'scancode_push'
	| 'scancode_waitmsg'
	| 'pic_sysphoto'
	| 'pic_photo_or_album'
	| 'pic_weixin'
	| 'location_select'
	EventKey?: string
	Ticket?: string
	Latitude?: string
	Longitude?: string
	Precision?: string
}

export type IWechatMessage =
	| ITextMessage
	| IImageMessage
	| IVoiceMessage
	| IVideoMessage
	| ILocationMessage
	| ILinkMessage
	| IEventMessage