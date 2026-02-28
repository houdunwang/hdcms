import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
const config = defineConfig({
  envDir: '../../',
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // '~registry': `${import.meta.dirname}/../admin/.adonisjs/client/registry.ts`,
      '@core': path.resolve(__dirname, 'core')
    },
  },
  // 构建相关配置
  build: {
    // 设置输出目录，默认值是 "dist"
    outDir: '../../build/front', // 这里将输出目录改为 build 文件夹
    // 可选：配置输出目录下的静态资源子目录（默认是 assets）
    assetsDir: 'static',
    // 可选：清空输出目录后再打包（默认 true）
    emptyOutDir: true
  }
})

export default config
