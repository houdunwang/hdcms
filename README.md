# 后盾云全栈开发脚手架

[English](./README_EN.md) | 简体中文


这是一个基于现代技术栈构建的全栈开发脚手架，旨在为开发者提供一个高效、规范、可扩展的开发起点。项目采用 Monorepo 架构，前后端均使用 TypeScript 开发，确保了代码的一致性与类型安全。

## 🚀 项目亮点

- **全栈 TypeScript 支持**：从后端 API 到前端 UI，全程享受类型安全带来的开发便利，减少运行时错误。
- **Monorepo 架构**：基于 `pnpm workspaces` 组织项目，轻松管理 `admin`（后端）、`front`（前端）及 `wechat`（微信插件）等多个包，实现代码共享。
- **后端：AdonisJS**：使用强大的 Node.js 框架 AdonisJS，内置了 ORM、身份验证、验证器等企业级特性，开发体验如丝般顺滑。
- **前端：TanStack 生态**：
    - **TanStack Start**：下一代全栈 React 框架，提供极速的 SSR 和 SPA 体验。
    - **TanStack Router & Query**：业内顶尖的路由管理与异步数据同步方案。
    - **TanStack Form**：类型安全的表单处理。
- **订单与支付**：集成了订单管理和支付功能。
- **现代 UI 方案**：集成 Tailwind CSS 与 Shadcn UI，配合 Lucide 图标库，快速构建美观且响应式的界面。
- **生产就绪**：内置 PM2 配置文件（`ecosystem.config.js`），支持集群模式，轻松部署至生产环境。

## 📖 文档网站

关于项目的详细使用指南、API 文档以及更多开发技巧，请访问我们的官方文档网站：

👉 **[后盾人文档：https://www.houdunyun.com](https://www.houdunyun.com)**

这里有持续更新的教程和实战案例，帮助你快速上手并精通全栈开发。

## 📺 互动交流

我们非常重视与开发者的交流，欢迎加入我们的社群或关注我们的直播：

- **直播时间**：每晚八点（20:00）
- **直播平台**：
    - **抖音**：搜索「后盾人」
    - **Bilibili**：搜索「后盾人」

在直播间，我们会分享最新的技术趋势、项目开发过程，并实时解答大家在开发中遇到的问题。

---

## 🛠 快速开始

1. **克隆项目**
   ```bash
   git clone git@github.com:houdunwang/web.git
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **启动开发环境**
   ```bash
   pnpm dev
   ```

---
感谢选择后盾人全栈开发脚手架，祝你编程愉快！
