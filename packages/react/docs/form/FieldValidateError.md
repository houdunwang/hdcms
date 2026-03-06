# FieldValidateError 使用指南

- 字段错误展示组件，支持表单校验错误与请求错误
- 请求错误来源于 fieldErrorAtom，可在接口失败时写入

## 导入

```tsx
import { FieldValidateError } from '@core/form'
```

## 使用示例

```tsx
import { useField } from '@tanstack/react-form'
import { FieldValidateError } from '@core/form'

export function Demo({ form }: { form: any }) {
  const username = useField({ form, name: 'username' })
  return <FieldValidateError field={username} />
}
```

## Props

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| field | IFieldApi | - | 是 | tanstack/react-form 字段对象 |
| className | string | - | 否 | 容器样式 |

## 行为说明

- 读取 field.state.meta.errors 的首条错误消息
- 同步监听值变化，若有值将清理对应的请求错误
- 若无错误内容则返回 null，不渲染

## 相关源码

- [FieldValidateError.tsx](file:///Users/hd/code/framework/packages/react/core/form/FieldValidateError.tsx)
