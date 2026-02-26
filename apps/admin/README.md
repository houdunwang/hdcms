<div align="center">

  <h1>API Starter Kit</h1>

  <p>
    <strong>A batteries-included AdonisJS starter kit for building modern, type-safe APIs.</strong>
  </p>

  <p>
    Built for developers who want a production-ready API with any frontend framework.
  </p>

  <br>

<a href="#-whats-in-the-box">Features</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#-quick-start">Quick Start</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://adonisjs.com">Documentation</a>

  <br>
  <br>

</div>

---

## ✨ What's in the Box

This starter kit is designed to help you build production-ready APIs with AdonisJS. It provides a solid foundation with authentication, type-safe routes, and everything you need to build modern APIs that work with any frontend framework.

### 🎯 Core Features

- **🔐 Dual Authentication** - API tokens (default) and session-based authentication pre-configured
- **🔄 RESTful API** - Clean API structure with versioning (`/api/v1`)
- **🏥 Health Check** - Built-in health check endpoint for monitoring
- **✅ Form Validation** - Powered by VineJS with automatic error handling
- **🛡️ Security First** - CORS, Shield middleware, and secure authentication
- **🔒 Type Safety** - End-to-end TypeScript with Tuyau for type-safe API calls
- **🌐 CORS Ready** - Pre-configured for cross-origin requests
- **📦 Monorepo** - Built with Turborepo and npm workspaces for optimal DX

### 🔧 Tech Stack

<table>
  <tr>
    <td><strong>Backend</strong></td>
    <td>
      <a href="https://adonisjs.com">AdonisJS 7.x</a> - Full-featured Node.js framework
    </td>
  </tr>
  <tr>
    <td><strong>Database</strong></td>
    <td>
      <a href="https://lucid.adonisjs.com">Lucid ORM</a> - SQL ORM with migrations (SQLite, PostgreSQL, MySQL, MSSQL)
    </td>
  </tr>
  <tr>
    <td><strong>Auth</strong></td>
    <td>
      API tokens (default) and session-based authentication
    </td>
  </tr>
  <tr>
    <td><strong>Validation</strong></td>
    <td>
      <a href="https://vinejs.dev">VineJS</a> - Type-safe schema validation
    </td>
  </tr>
  <tr>
    <td><strong>Type Safety</strong></td>
    <td>
      <a href="https://tuyau.dev">Tuyau</a> - End-to-end type safety for API calls
    </td>
  </tr>
  <tr>
    <td><strong>Testing</strong></td>
    <td>
      <a href="https://japa.dev">Japa</a> - Delightful testing framework
    </td>
  </tr>
  <tr>
    <td><strong>TypeScript</strong></td>
    <td>
      Full TypeScript support with strict mode enabled
    </td>
  </tr>
  <tr>
    <td><strong>Monorepo</strong></td>
    <td>
      <a href="https://turbo.build">Turborepo</a> + npm workspaces
    </td>
  </tr>
</table>

---

## 🚀 Quick Start

### From the Monorepo Root

```bash
# Install dependencies
npm install

# Run the development server (both backend and frontend)
npm run dev

# Run tests
npm run test

# Type check all apps
npm run typecheck

# Lint all apps
npm run lint

# Build for production
npm run build
```

### Backend Only (from apps/backend)

```bash
# Run the development server with hot reload
node ace serve --hmr

# Run tests
node ace test

# Type check
npm run typecheck

# Lint your code
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

Your API will be running at `http://localhost:3333`

### Available Endpoints

- `POST /api/v1/auth/signup` - Create a new account
- `POST /api/v1/auth/login` - Login and get access token
- `POST /api/v1/auth/logout` - Logout (requires authentication)
- `GET /api/v1/me` - Get current user (requires authentication)

---

## 📚 Learn More

<table>
  <tr>
    <td>
      <a href="https://docs.adonisjs.com"><strong>📖 AdonisJS Docs</strong></a>
      <br>
      <span>Complete guide to AdonisJS</span>
    </td>
    <td>
      <a href="https://tuyau.dev"><strong>🔒 Tuyau</strong></a>
      <br>
      <span>Type-safe API calls</span>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://lucid.adonisjs.com"><strong>💾 Lucid ORM</strong></a>
      <br>
      <span>Database queries and relationships</span>
    </td>
    <td>
      <a href="https://vinejs.dev"><strong>✅ VineJS</strong></a>
      <br>
      <span>Schema validation guide</span>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://turbo.build"><strong>📦 Turborepo</strong></a>
      <br>
      <span>Monorepo build system</span>
    </td>
    <td>
      <a href="https://docs.adonisjs.com/guides/security/cors"><strong>🌐 CORS Guide</strong></a>
      <br>
      <span>Configure CORS for your API</span>
    </td>
  </tr>
</table>

---

## 🎨 Philosophy

This starter kit embraces the **API-first** approach to web development:

- **Framework Agnostic** - Use any frontend framework (React, Vue, Svelte, Angular, etc.)
- **Type Safety Everywhere** - TypeScript across the stack with Tuyau for type-safe API calls
- **Dual Authentication** - API tokens for cross-origin and sessions for same-domain apps
- **Convention Over Configuration** - Sensible defaults, escape hatches when you need them
- **Developer Experience** - Hot reload, great error messages, instant feedback
- **Production Ready** - Security, validation, and testing built-in

### Authentication Strategies

This starter kit provides both authentication strategies:

- **API Tokens (Default)** - Use when your API and frontend are on different domains. Stateless and perfect for mobile apps, SPAs, and third-party integrations.
- **Session-based** - Use when your API and frontend share the same top-level domain. Traditional cookie-based authentication with CSRF protection.

You can easily switch between strategies by changing the guard in your middleware configuration.

---

## 🤝 Contributing

This starter kit is maintained by the AdonisJS team. Found a bug or have a suggestion? [Open an issue](https://github.com/adonisjs/api-starter-kit/issues) or submit a pull request!

---

## 📄 License

This starter kit is open-sourced software licensed under the [MIT license](LICENSE).

---

<div align="center">
  <sub>Built with ❤️ by the AdonisJS team</sub>
</div>
