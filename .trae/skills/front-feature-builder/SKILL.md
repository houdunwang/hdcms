---
name: "front-feature-builder"
description: "生成 React 组件或 Hooks，遵循 apps/front 规范；当需要新增前端组件/Hook或将逻辑封装为规范化模块时调用。"
---

# 前端功能生成器

本技能用于在 `apps/front` 中快速创建符合项目规范的前端功能，包括 React 组件与 Hooks，并提供接入与校验步骤。

## 适用时机
- 需要新增通用或业务 React 组件
- 需要将页面逻辑抽象为可复用的 Hook
- 需要按既有工程化规范扩展 UI/交互

## 项目规范要点
- 技术栈：React 19 + TypeScript + Vite
- 路由：TanStack Router 文件路由（`src/routes`）
- 样式：Tailwind CSS v4 + shadcn design tokens，使用 `cn` 合并类名
- 组件：Radix primitives + lucide-react；存放于 `src/components/ui` 或业务目录
- Hooks：命名 `useXxx`，存放于 `src/hooks`
- 工具：使用 `@/lib/utils` 中的 `cn`
- 脚本：`npm run dev | build | preview | test`

## 输入参数
- 类型：`component | hook`
- 名称：PascalCase 组件名或 `useXxx` Hook 名
- 位置：`ui | lesson | hooks` 等（默认：`ui` 或 `hooks`）
- 需求要点：功能、状态、交互、变体、外部依赖

## 组件生成步骤
1. 路径：`src/components/ui/<Name>.tsx` 或业务目录
2. 结构：使用 TSX + `cn`；必要时用 `cva` 管理变体
3. 导出：命名导出（例如 `export { Name }`）
4. 依赖：按需使用 Radix primitives / lucide-react
5. 校验：构建与测试

示例：

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const variants = cva("inline-flex items-center justify-center rounded-lg", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      outline: "border border-border bg-background",
      ghost: "hover:bg-muted",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-9 px-4",
      lg: "h-10 px-5 text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

type Props = React.ComponentProps<"button"> & VariantProps<typeof variants>

function FancyButton({ className, variant, size, ...props }: Props) {
  return (
    <button className={cn(variants({ variant, size }), className)} {...props} />
  )
}

export { FancyButton }
```

## Hook 生成步骤
1. 路径：`src/hooks/useXxx.ts`
2. 结构：类型明确、无副作用导出默认值，必要时暴露返回类型
3. 依赖：优先使用 React 与项目内工具
4. 校验：测试用例可选

示例：

```ts
import * as React from "react"

type Options = {
  initial?: number
}

function useCounter({ initial = 0 }: Options = {}) {
  const [count, setCount] = React.useState(initial)
  const inc = React.useCallback(() => setCount(c => c + 1), [])
  const dec = React.useCallback(() => setCount(c => c - 1), [])
  const reset = React.useCallback(() => setCount(initial), [initial])
  return { count, inc, dec, reset }
}

export { useCounter }
```

## 路由/页面接入（可选）
- 在 `src/routes` 中新增页面文件，使用 `createFileRoute` 声明
- 通过组件或 Hook 完成页面 UI 与逻辑

## 校验步骤
- 构建：`npm run build`
- 预览：`npm run preview`
- 测试：`npm run test`

## 参考
- 入口与上下文：[main.tsx](file:///Users/hd/code/framework/apps/front/src/main.tsx)
- 路由树生成：[routeTree.gen.ts](file:///Users/hd/code/framework/apps/front/src/routeTree.gen.ts)
- 根路由与样式导入：[__root.tsx](file:///Users/hd/code/framework/apps/front/src/routes/__root.tsx)
- UI 组件示例：[button.tsx](file:///Users/hd/code/framework/apps/front/src/components/ui/button.tsx)
- 工具函数 `cn`：[utils.ts](file:///Users/hd/code/framework/apps/front/src/lib/utils.ts)
