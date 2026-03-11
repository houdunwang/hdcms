import { devtools } from '@tanstack/devtools-vite'
import { defineConfig } from 'vite'
import path from 'node:path'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
const config = defineConfig({
  envDir: '../../config/',
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: ['client.hdcms.com'],
  },
  // 构建相关配置
  build: {
    // 设置输出目录，默认值是 "dist"
    outDir: 'build', // 将输出目录设置到包内，便于 Turborepo 缓存与追踪
    // 可选：配置输出目录下的静态资源子目录（默认是 assets）
    assetsDir: 'static',
    // 可选：清空输出目录后再打包（默认 true）
    emptyOutDir: true
  }
})

export default config
