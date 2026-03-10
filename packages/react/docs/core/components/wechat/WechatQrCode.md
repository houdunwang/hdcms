# WechatQrCode

微信场景二维码组件。用于生成包含任意场景值（scene_str）的微信二维码，并在固定时间间隔内轮询业务回调以检测目标状态是否达成；当达到最大轮询次数后视为二维码过期并提供刷新操作。

## 使用示例

```tsx
import { WechatQrCode } from '@/components/wechat/WechatQrCode'

export function WechatQrSceneDemo() {
  const handleScene = async (ticket: string) => {
    // 调用后端根据 scene_str/ticket 判断业务是否完成
    const res = await fetch(`/api/wechat/scene/check?ticket=${ticket}`)
    if (res.ok) {
      // 返回 'success' 将终止轮询并结束流程
      return 'success'
    }
    // 返回 'exist' 或 undefined 将继续轮询（业务可自定义其意义）
    return undefined
  }

  return (
    <WechatQrCode
      scene_str="bind_user" // 示例：可用于绑定、授权、激活、核销等业务场景
      onSuccess={handleScene}
      requestCount={30}
      timeout={2000}
    />
  )
}
```

## Props

| Prop         | 类型                                                           | 默认值 | 必填 | 描述                                                                                                                                        |
| ------------ | -------------------------------------------------------------- | ------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| scene_str    | string                                                         | —      | 是   | 微信二维码场景值，用于服务端生成/识别二维码。                                                                                               |
| onSuccess    | (ticket: string) => Promise<'success' \| 'exist' \| undefined> | —      | 是   | 轮询时调用的业务回调；当返回值为 `'success'` 时停止轮询并结束流程；返回 `'exist'` 或 `undefined` 时继续轮询（可用于自定义提示或业务分支）。 |
| requestCount | number                                                         | 30     | 否   | 最大轮询次数；耗尽后视为二维码过期。                                                                                                        |
| timeout      | number                                                         | 2000   | 否   | 轮询间隔（毫秒）。                                                                                                                          |
| className    | string                                                         | —      | 否   | 外层容器样式类名。                                                                                                                          |

## 交互说明

- 初次挂载即向后端申请二维码并显示。
- 当二维码存在时，每隔 `timeout` 毫秒调用 `onSuccess(ticket)` 以检测状态。
- 当 `onSuccess` 返回 `'success'` 时终止轮询；如果抛出异常会自动重新申请二维码。
- 当 `requestCount` 次数耗尽后，组件显示“二维码已过期”的提示与“刷新二维码”按钮。
- 用户可点击二维码图片或刷新按钮以重新申请二维码。

## 适用场景

- 登录与授权
- 用户绑定/解绑
- 会员关注、活动参与
- 设备配对、激活、核销
- 其他基于 scene_str 的自定义业务

## 使用建议

- `scene_str` 应在业务中具有唯一性与明确的生命周期，便于后端识别。
- 在 `onSuccess` 中与后端约定清晰的返回语义；避免未处理异常影响用户体验。
- 可根据业务需要调整 `requestCount` 与 `timeout`，以平衡体验与接口压力。
