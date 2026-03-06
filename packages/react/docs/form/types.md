# 类型说明（@core/form/types）

## FormFieldProps<T>

- 作用：用于封装字段组件的通用 Props，屏蔽表单内部接管的属性
- 结构：基于 `React.ComponentProps<T>`，去除 `name`/`value`/`onChange`/`onBlur`/`id`
- 额外属性：
  - `label?: React.ReactNode`
  - `description?: React.ReactNode`
  - `className?: string`
  - `fieldClassName?: string`

## IFieldApi

- 作用：`@tanstack/react-form` 的 `FieldApi` 类型别名
- 用途：如 `FieldValidateError` 等需要接收字段对象的组件

## 相关源码

- [types.ts](file:///Users/hd/code/framework/packages/react/core/form/types.ts)
