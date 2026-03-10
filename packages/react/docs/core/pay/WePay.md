# WePay 组件文档

微信支付二维码弹窗组件。点击触发后生成二维码，自动轮询支付状态；支付成功会调用回调并关闭弹窗；二维码倒计时到期后自动刷新。

源码位置：[WePay.tsx](file:///Users/hd/code/framework/packages/react/core/pay/WePay.tsx)

## 使用示例

```tsx
import { WePay } from '@/pay/WePay'

export default function Demo() {
  const handleSuccess = () => {
    // 支付成功后的业务逻辑，例如刷新订单状态
  }

  return (
    <WePay
      subject="课程购买"
      orderable_type="Order"
      orderable_id={123}
      qrRefreshTime={120}
      onSuccess={handleSuccess}
    >
      支付订单：#123
    </WePay>
  )
}
```

## Props

| 名称           | 类型       | 默认值 | 必填 | 描述                                       |
| -------------- | ---------- | ------ | ---- | ------------------------------------------ |
| subject        | string     | —      | 是   | 支付主题或订单标题                         |
| orderable_type | any        | —      | 是   | 业务类型标识（如订单类型字符串或枚举）     |
| orderable_id   | number     | —      | 是   | 对应订单或资源的唯一 ID                    |
| onSuccess      | () => void | —      | 是   | 支付成功后触发的回调，组件会自动关闭弹窗   |
| children       | ReactNode  | —      | 否   | 显示在二维码上方的自定义内容（如订单摘要） |
| payButton      | ReactNode  | —      | 否   | 自定义触发按钮；不传时显示“微信支付”按钮   |
| qrRefreshTime  | number     | 120    | 否   | 二维码自动刷新倒计时（秒）                 |

## 交互说明

- 首次打开弹窗即生成二维码并开始倒计时与支付状态检查。
- 每秒递减倒计时；倒计时为 0 时自动刷新二维码并重置倒计时。
- 支付状态返回 success 时调用 onSuccess 并自动关闭弹窗。
- 触发按钮可自定义；未传入时默认显示“微信支付”按钮。
