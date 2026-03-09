# HDCMS 全栈开发脚手架

[English](./README_EN.md) | 简体中文

现代 TypeScript 全栈、开箱即用、面向生产的工程基座。采用 Monorepo 架构，前后端统一类型与规范，专注业务而非重复造轮子。

> 高质量视频教程 ：[houdunren.com](https://www.houdunren.com)

## 🚀 项目亮点

- **全栈 TypeScript**：接口到组件统一类型，智能提示与重构友好，显著降低线上问题。
- **Monorepo 管理**：以 `pnpm workspaces` 组织 `admin`（后端）、`front`（前端）、`wechat`（微信插件），代码可共享、模块可复用。
- **后端 AdonisJS**：内置 ORM、身份验证、校验器等企业级能力，开发体验顺滑、规范统一。
- **前端 TanStack 生态**：
  - **TanStack Router & Query**：文件路由与数据同步的黄金组合。
  - **TanStack Form**：类型驱动的表单体验，减少低级错误。
- **现代 UI 方案**：Tailwind CSS + Shadcn UI + Lucide 图标，快速打造美观、响应式界面。
- **内置业务能力**：提供订单与支付集成，直接用于实际业务场景。
- **生产就绪**：提供 PM2 `ecosystem.config.js`，支持集群模式与平滑部署。

## 💡 功能总览

- **后端能力**：ORM 数据访问、认证与授权、请求校验、健壮的模块化结构
- **前端能力**：SSR/SPA、文件路由、服务端/客户端数据协同、类型安全表单
- **工程化与部署**：Monorepo 包管理、代码共享、PM2 部署、规范化目录与约定
- **业务能力**：订单管理、支付对接、微信插件拓展（`wechat` 包）

## 🧭 架构一览

- **admin**：AdonisJS 后端（API/认证/数据）
- **front**：TanStack Query Tanstack Form Shadcn UI 前端（路由/数据/表单/UI）
- **wechat**：微信相关插件与扩展
- **工具链**：`pnpm` + `workspaces` 持续构建与复用

## 📖 文档网站

关于项目的详细使用指南、API 文档以及更多开发技巧，请访问我们的官方文档网站：

👉 **[使用文档：https://www.hdcms.com](https://www.hdcms.com)**

这里有持续更新的教程和实战案例，帮助你快速上手并精通全栈开发。

## 📺 互动交流

我是软件作者向军大叔，我非常重视与使用者的交流，欢迎来直播间互动：

- **直播时间**：一般会在晚上八点（20:00）开启直播
- **直播平台**：
  - **抖音**：搜索「后盾云」
  - **Bilibili**：搜索「后盾云」

在直播间，我们会分享最新的技术趋势、项目开发过程，并实时解答大家在开发中遇到的问题。

---

## 🛠 快速开始

你可以使用两种方法安装项目：通过命令行工具或使用GIT克隆项目。

### 使用命令安装

```bash
pnpm create hdcms
```

### 使用GIT克隆项目

1. **克隆项目**

   ```bash
   git clone git@github.com:houdunwang/hdcms.git
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

感谢选择后盾云全栈开发脚手架
