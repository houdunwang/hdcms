# 消息类型

本文档介绍了判断消息类型的方法。

## 使用方法

在使用消息类型判断方法之前，需要先实例化 `Wechat` 类，并调用 `init` 方法进行初始化，然后调用 `parse` 方法解析微信服务器发送的原始消息。

```typescript
// 1. 实例化 Wechat
const wechat = new Wechat()
// 初始化
await wechat.init({
  appid: 'YOUR_APPID',
  secret: 'YOUR_SECRET',
  token: 'YOUR_TOKEN'
});

// 2. 假设 rawXmlData 是从微信服务器收到的原始 XML 字符串
const rawXmlData = `<xml>
  <ToUserName><![CDATA[toUser]]></ToUserName>
  <FromUserName><![CDATA[fromUser]]></FromUserName>
  <CreateTime>1348831860</CreateTime>
  <MsgType><![CDATA[text]]></MsgType>
  <Content><![CDATA[this is a test]]></Content>
  <MsgId>1234567890123456</MsgId>
</xml>`

// 3. 解析消息
await wechat.parse(rawXmlData)

// 现在 wechat 实例上已经包含了消息内容，可以使用类型判断方法
if (wechat.isText()) {
  console.log('这是一条文本消息');
}
```

## 方法详情

### `isText()`
是否是文本消息。

---

### `isImage()`
是否是图片消息。

---

### `isVoice()`
是否是语音消息。

---

### `isVideo()`
是否是视频消息。

---

### `isShortVideo()`
是否是小视频消息。

---

### `isLocation()`
是否是地理位置消息。

---

### `isLink()`
是否是链接消息。

---

### `isEvent()`
是否是事件消息。

---

### `isSubscribe()`
是否是关注事件。

---

### `isUnsubscribe()`
是否是取消关注事件。

---

### `isScan()`
是否是扫描带参数二维码事件。

---

### `isLocationEvent()`
是否是上报地理位置事件。

---

### `isClick()`
是否是自定义菜单事件。

---

### `isView()`
是否是点击菜单跳转链接时的事件。

---

### `isScanPush()`
是否是扫码推事件。

---

### `isScanWait()`
是否是扫码推事件且弹出“消息接收中”提示框。

---

### `isPicSysPhoto()`
是否是弹出系统拍照发图。

---

### `isPicPhotoOrAlbum()`
是否是弹出拍照或者相册发图。

---

### `isPicWeixin()`
是否是弹出微信相册发图器。

---

### `isLocationSelect()`
是否是弹出地理位置选择器。

---
