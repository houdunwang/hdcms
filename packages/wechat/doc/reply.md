# 回复消息

本文档介绍了如何通过 `Wechat` 实例使用 `reply` 服务来构建微信回复消息。

## 访问 Reply 服务

`reply` 服务已集成到 `Wechat` 实例的 `services` 属性中。您可以通过 `wechat.services.reply` 来访问所有回复方法。

```typescript
import Wechat from './index.js';

// 假设 wechat 实例已创建
const wechat = new Wechat({ ...config });

// 所有回复方法都通过 wechat.services.reply 调用
```

## 方法详情

### `text(content)`

回复文本消息。

**参数:**
- `content` (string): 回复的文本内容。

**使用示例:**
```typescript
const xmlResponse = wechat.services.reply.text('你好，欢迎关注！');
// xmlResponse 将是一个 XML 格式的字符串
```

---

### `image(mediaId)`

回复图片消息。

**参数:**
- `mediaId` (string): 通过素材管理接口上传图片，得到的 `media-id`。

**使用示例:**
```typescript
const xmlResponse = wechat.services.reply.image('your_media-id');
```

---

### `voice(mediaId)`

回复语音消息。

**参数:**
- `mediaId` (string): 通过素材管理接口上传语音，得到的 `media-id`。

**使用示例:**
```typescript
const xmlResponse = wechat.services.reply.voice('your_media-id');
```

---

### `video(mediaId, title, description)`

回复视频消息。

**参数:**
- `mediaId` (string): 通过素材管理接口上传视频，得到的 `media-id`。
- `title` (string, 可选): 视频消息的标题。
- `description` (string, 可选): 视频消息的描述。

**使用示例:**
```typescript
const xmlResponse = wechat.services.reply.video('your_media-id', '视频标题', '视频描述');
```

---

### `music(thumbMediaId, musicUrl, hqMusicUrl, title, description)`

回复音乐消息。

**参数:**
- `thumbMediaId` (string): 缩略图的媒体 id。
- `musicUrl` (string, 可选): 音乐链接。
- `hqMusicUrl` (string, 可选): 高质量音乐链接。
- `title` (string, 可选): 音乐标题。
- `description` (string, 可选): 音乐描述。

**使用示例:**
```typescript
const xmlResponse = wechat.services.reply.music(
  'your_thumb_media-id',
  'http://your.music.url',
  'http://your.hq.music.url',
  '音乐标题',
  '音乐描述'
);
```

---

### `news(articles)`

回复图文消息。

**参数:**
- `articles` (Array): 图文消息对象数组，每个对象包含 `title`, `description`, `picUrl`, `url`。

**使用示例:**
```typescript
const articles = [
  {
    title: '文章标题1',
    description: '文章描述1',
    picUrl: 'http://your.pic.url/1',
    url: 'http://your.article.url/1'
  },
  {
    title: '文章标题2',
    description: '文章描述2',
    picUrl: 'http://your.pic.url/2',
    url: 'http://your.article.url/2'
  }
];
const xmlResponse = wechat.services.reply.news(articles);
```

---

### `transferCustomerService()`

将消息转发到多客服系统。

**使用示例:**
```typescript
const xmlResponse = wechat.services.reply.transferCustomerService();
```
