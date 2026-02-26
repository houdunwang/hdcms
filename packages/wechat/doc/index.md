# Wechat SDK 使用文档

本文档介绍了 `wechat` SDK 的使用方法。

## Wechat 类

`Wechat` 类是 SDK 的主类，用于处理与微信公众号的交互。

### 实例化

首先，您需要导入并实例化 `Wechat` 类：

```typescript
import Wechat from 'wechat';

const wechat = new Wechat();
```

### 方法

#### `init(config: IConfig)`

用于初始化微信公众号的配置。这是一个异步方法。

**参数:**

*   `config`: `IConfig` 类型的配置对象，包含以下属性：
    *   `appid`: 微信公众号的 AppID。
    *   `secret`: 微信公众号的 AppSecret。
    *   `token`: 您在微信公众号开发设置中填写的 Token。
    *   `encodingAESKey`: (可选) 用于消息加密的 EncodingAESKey。

**示例:**

```typescript
await wechat.init({
  appid: 'YOUR_APPID',
  secret: 'YOUR_SECRET',
  token: 'your_wechat_token'
});
```

#### `parse(raw: string | null)`

解析微信服务器发送的 XML 数据。这是一个异步方法。

**参数:**

*   `raw`: 包含 XML 数据的字符串。

**返回值:**

`Promise<void>`

**示例:**

```typescript
const rawXML = `<xml>...</xml>`;
await wechat.parse(rawXML);
```

#### `bind(query: Record<string, any>)`

用于在首次配置服务器时验证微信服务器消息的真实性。

**参数:**

*   `query`: 包含微信服务器发送的查询参数的对象，应包括：
    *   `signature`: 微信加密签名。
    *   `timestamp`: 时间戳。
    *   `nonce`: 随机数。
    *   `echostr`: 随机字符串。

**返回值:**

如果验证成功，返回 `echostr`；否则返回 `false`。

**示例:**

```typescript
// 在您的 web 框架中 (例如 Express.js)
app.get('/wechat', (req, res) => {
  const isValid = wechat.bind(req.query);

  if (isValid) {
    res.send(isValid);
  } else {
    res.send('error');
  }
});
```

#### `services.reply`

`reply` 服务用于构造回复给用户的消息。

**示例:**

```typescript
// 回复文本消息
const replyMessage = wechat.services.reply.text('Hello!');
```

#### `services.userInfo`

`userInfo` 服务用于获取用户信息。

**示例:**

```typescript
// 获取用户信息
const userInfo = await wechat.services.userInfo.get('USER_OPENID');
```
