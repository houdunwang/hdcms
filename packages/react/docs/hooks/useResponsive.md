# useResponsive 使用指南

基于 `ahooks` 的响应式断点检测，预设 `small/middle/large` 三档屏幕宽度断点。

## 快速上手

```tsx
import { useResponsive } from '@core/hooks'

export function Demo() {
  const responsive = useResponsive()
  // responsive.small / responsive.middle / responsive.large 为 boolean
  return null
}
```

## 返回值

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | ---: | --- |
| responsive | object | - | 包含各断点布尔值的对象 |

## 断点定义

- small：>= 0
- middle：>= 800
- large：>= 1200

