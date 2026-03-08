---
name: 'front-feature-docs'
description: '生成组件或 Hooks 的使用说明 Markdown；当需要为前端功能编写面向开发者的用法文档时调用。'
---

# 前端功能用法文档生成器

用于在 `apps/front` 中为 React 组件或 Hooks 生成结构化的使用说明 Markdown，帮助其他开发者快速理解与集成。

## 适用时机

- 为已存在的组件/Hook补充或更新使用文档
- 在交付新功能时同步编写开发者使用说明
- 将页面内散落的用法整理为可复用文档

## 输入参数

- 类型：`component | hook`
- 名称：组件名（PascalCase）或 Hook 名（useXxx）
- 文件：绝对路径（如 `src/components/ui/button.tsx`）
- 场景：典型使用场景与非功能性约束（性能、可访问性、主题等）
- 依赖：外部包与内部模块（Radix、lucide-react、cn 等）

## 生成流程

1. 分析源码：识别 Props/返回值、事件、状态、`cva` 变体、`cn` 样式用法
2. 关联上下文：路由/页面集成点、主题与样式、鉴权或数据依赖
3. 产出 Markdown：按模板生成文档并插入代码引用链接
4. 校验：运行 `npm run build | preview | test` 以确保示例可用（可选）

## 触发语句

强触发

- 生成组件使用文档
- 生成 Hook 使用说明
- 写使用手册（组件/Hook）
- 输出用法 Markdown
- 产出组件/Hook 的 API 文档
- 生成开发者使用文档

与目标绑定的触发语句

- 为 Button 生成使用说明
- 为 useIsMobile 写用法文档
- 给 src/components/ui/button.tsx 生成用法手册
- 生成某组件/Hook 的使用文档并包含示例

## 文档模板

````markdown
# <名称>（<类型>）

## 概述

- 作用与适用场景
- 依赖：<依赖列表>
- 文件位置：<文件链接>

## 安装与导入

```ts
import { <Name> } from "@/components/ui/<file>"
// 或
import { <Hook> } from "@/hooks/<file>"
```
````

## 快速示例

```tsx
// 展示最小可用示例（组件）或典型调用（Hook）
```

## API

- Props/参数说明：名称、类型、默认值、作用
- 事件/回调：触发时机、签名
- 返回值（Hook）：结构与说明

## 变体与样式

- 变体（若使用 cva）：枚举值、视觉与行为差异
- 类名与主题：如何使用 `cn` 合并类；与 Tailwind v4 的关系

## 依赖与引用

- 外部依赖：Radix、lucide-react 等
- 内部引用：`@/lib/utils`、其他组件或 hooks

## 集成建议

- 在 TanStack Router 路由/页面中的使用模式
- 与 Query、Auth、Layout 的配合注意事项

## 可访问性与交互

- 键盘/屏幕阅读支持
- 受控/非受控用法

## 常见问题

- 兼容性、边界条件、性能提示

## 代码引用

- 关键实现片段与对应文件链接

```

## 代码引用规范
- 使用绝对路径链接：`file:///Users/hd/code/framework/apps/front/...`
- 指定行号范围：`#L10-L40` 便于快速跳转
- 示例：
  - [button.tsx](file:///Users/hd/code/framework/apps/front/src/components/ui/button.tsx)
  - [utils.ts:cn](file:///Users/hd/code/framework/apps/front/src/lib/utils.ts#L1-L6)

## 调用流程
- 如果已提供：类型、名称、文件路径 → 直接生成 Markdown 并在消息中返回
- 如果未完整提供 → 主动在 `apps/front` 检索代码，推断 API 与示例后生成
- 仅在用户明确要求写入文件时，才把文档保存到指定路径（默认不创建文件）
- 输出语言：与用户输入一致（本项目默认中文）

## 调用示例
- 生成组件文档：
  - 请求：`component: Button, file: src/components/ui/button.tsx`
  - 响应：返回包含 API、变体、示例与代码链接的 Markdown
- 生成 Hook 文档：
  - 请求：`hook: useIsMobile, file: src/hooks/use-mobile.ts`
  - 响应：返回包含参数、返回值、典型调用与集成建议的 Markdown

## 参考
- 项目入口与上下文：[main.tsx](file:///Users/hd/code/framework/apps/front/src/main.tsx)
- 路由树生成：[routeTree.gen.ts](file:///Users/hd/code/framework/apps/front/src/routeTree.gen.ts)
- 根路由与样式导入：[__root.tsx](file:///Users/hd/code/framework/apps/front/src/routes/__root.tsx)
- UI 组件示例：[button.tsx](file:///Users/hd/code/framework/apps/front/src/components/ui/button.tsx)
- 工具函数 `cn`：[utils.ts](file:///Users/hd/code/framework/apps/front/src/lib/utils.ts)
```
