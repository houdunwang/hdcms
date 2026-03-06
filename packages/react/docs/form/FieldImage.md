# FieldImage 使用指南

- 图片上传字段组件，支持拖拽或点击选择文件
- 上传成功后写入字段值为图片 URL，并回调 onSuccess
- 集成 FieldValidateError 展示校验或请求错误

## 导入

```tsx
import { FieldImage } from '@core/form'
```

## 使用示例

```tsx
import { createFormHook } from '@tanstack/react-form'
import { FieldImage, FieldSubmitButton, fieldContext, formContext } from '@core/form'

const { useAppForm } = createFormHook({
  fieldComponents: { FieldImage },
  formComponents: { FieldSubmitButton },
  fieldContext,
  formContext,
})

export function Demo() {
  const form = useAppForm({
    defaultValues: { avatar: '' },
    onSubmit: async ({ value }) => { /* 提交逻辑 */ },
  })
  return (
    <form onSubmit={(e) => { e.preventDefault(); void form.handleSubmit() }}>
      <form.AppField
        name="avatar"
        children={(field) => (
          <field.FieldImage
            fieldClassName="h-32 w-32"
            onSuccess={(url) => { /* 例如：预览或同步其他状态 */ }}
          />
        )}
      />
      <form.AppForm>
        <form.FieldSubmitButton label="提交" />
      </form.AppForm>
    </form>
  )
}
```

## Props

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| onSuccess | (url: string) => void | - | 是 | 上传成功后的回调；同时字段值会被设为该 URL |
| maxSize | number | 2 | 否 | 单位 MB；默认 2MB |
| fieldClassName | string | - | 否 | 图片预览容器样式 |
| 其余 input 属性 | 参考原生 input | - | 否 | 由内部的 dropzone input 使用 |

## 行为说明

- 接受类型为 image/* 的单文件上传，限制数量为 1
- 上传接口使用 api.uploads.imageSingle，失败时会将错误写入 fieldErrorAtom
- 有值时显示图片预览；无值时显示选择提示与图标

## 相关源码

- [FieldImage.tsx](file:///Users/hd/code/framework/packages/react/core/form/FieldImage.tsx)
