# Full-Stack Development Scaffold

English | [简体中文](./README.md)

Modern TypeScript full‑stack, out‑of‑the‑box, production‑ready engineering base. Monorepo architecture with unified types and conventions across backend and frontend—focus on business, not boilerplate.

> High‑quality video tutorials: [houdunren.com](https://www.houdunren.com)

## 🚀 Project Highlights

- **Full-Stack TypeScript Support**: Enjoy the benefits of type safety from backend APIs to frontend UI, significantly reducing runtime errors.
- **Monorepo Architecture**: Managed via `pnpm workspaces`, allowing seamless coordination between `admin` (backend), `front` (frontend), and `wechat` (wechat plugin) packages while sharing common code.
- **Backend: AdonisJS**: Powered by the robust AdonisJS framework, featuring built-in ORM, authentication, validators, and other enterprise-grade features for a smooth developer experience.
- **Frontend: TanStack Ecosystem**:
  - **TanStack Router & Query**: Industry-leading solutions for type-safe routing and asynchronous data synchronization.
  - **TanStack Form**: Type-safe form handling.
- **Order & Payment**: Integrated order management and payment functionalities.
- **Modern UI Solutions**: Integrated with Tailwind CSS and Shadcn UI, paired with Lucide icons for building beautiful, responsive interfaces quickly.
- **Production Ready**: Includes a pre-configured PM2 setup (`ecosystem.config.js`) supporting cluster mode for easy deployment.

## 💡 Capabilities Overview

- **Backend**: ORM data access, authentication & authorization, request validation, modular structure
- **Frontend**: SSR/SPA, file routing, server/client data coordination, type-safe forms
- **Engineering & Deployment**: Monorepo package management, code sharing, PM2 deployment, standardized directories and conventions
- **Business**: Order management, payment integration, WeChat plugin extensions (`wechat` package)

## 🧭 Architecture Overview

- **admin**: AdonisJS backend (API/auth/data)
- **front**: TanStack Router & Query, TanStack Form, Shadcn UI (routing/data/forms/UI)
- **wechat**: WeChat-related plugins and extensions
- **Toolchain**: `pnpm` + `workspaces` for continuous build and reuse

## 📖 Documentation

For detailed usage guides, API documentation, and advanced development tips, please visit our official documentation site:

👉 **[Usage Docs: https://www.hdcms.com](https://www.hdcms.com)**

We provide continuously updated tutorials and real-world cases to help you master full-stack development.

## 📺 Live Streams & Community

We highly value interaction with developers. Join our community or follow our live sessions:

- **Live Time**: Every night at 8:00 PM (GMT+8)
- **Platforms**:
  - **Douyin**: Search for "后盾云" (HoudunYun)
  - **Bilibili**: Search for "后盾云" (HoudunYun)

During live sessions, we share the latest technical trends, demonstrate project development, and answer your questions in real-time.

---

## 🛠 Quick Start

You can install the project using either the CLI or by cloning via Git.

### Use CLI

```bash
pnpm create hdcms
```

### Clone via Git

1. **Clone the Project**

   ```bash
   git clone git@github.com:houdunwang/hdcms.git
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Start Development Environment**
   ```bash
   pnpm dev
   ```

---

Thank you for choosing the HoudunYun Full-Stack Scaffold.
