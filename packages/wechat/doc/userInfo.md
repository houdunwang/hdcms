# UserInfo

`UserInfo` 类用于获取微信用户的基本信息。

## 使用方法

首先，你需要一个 `Wechat` 类的实例，然后在实例上调用 `services.userInfo`。

```typescript
import Wechat from '@h-dk/wechat';

// 1. 初始化 Wechat 实例
const wechat = new Wechat();
await wechat.init({
  appid: 'YOUR_APPID',
  secret: 'YOUR_SECRET',
  token: 'YOUR_TOKEN'
});

// 2. 获取用户信息
const userInfo = await wechat.services.userInfo.get('USER_OPENID');

console.log(userInfo);
```

## 方法

### `get(openid: string)`

获取指定用户的基本信息。

**参数:**

| 参数     | 类型   | 描述             |
| :------- | :----- | :--------------- |
| `openid` | `string` | 用户的唯一标识 OpenID。 |

**返回值:**

返回一个 `Promise`，该 `Promise` resolve 后会得到一个包含用户信息的对象。例如：

```json
{
  "subscribe": 1,
  "openid": "o6_bmjrPTlm6_2sgVt7hMZOPfL2M",
  "nickname": "Band",
  "sex": 1,
  "language": "zh_CN",
  "city": "广州",
  "province": "广东",
  "country": "中国",
  "headimgurl": "http://thirdwx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0",
  "subscribe_time": 1382694957,
  "unionid": " o6_bmasdasdsad6_2sgVt7hMZOPfL"
}
```
*注意：返回值的具体结构请参考微信官方文档。*
