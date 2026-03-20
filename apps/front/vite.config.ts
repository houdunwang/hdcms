import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: ['client.hdcms.com'],
    watch: {}
  },
  // 构建相关配置
  build: {
    // 设置输出目录，默认值是 "dist"
    outDir: './build', // 将输出目录设置到包内，便于 Turborepo 缓存与追踪
    // 可选：配置输出目录下的静态资源子目录（默认是 assets）
    assetsDir: 'static',
    // 可选：清空输出目录后再打包（默认 true）
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          const lastIdx = id.lastIndexOf('node_modules/')
          const sub = id.slice(lastIdx + 'node_modules/'.length)
          const segs = sub.split('/')
          const pkg = segs[0].startsWith('@') ? `${segs[0]}/${segs[1]}` : segs[0]
          const groups: Record<string, string> = {
            react: 'vendor-react',
            'react-dom': 'vendor-react',
            scheduler: 'vendor-react',
            'react-is': 'vendor-react',
            'use-sync-external-store': 'vendor-react',
            'object-assign': 'vendor-react',
            '@tanstack/react-router': 'vendor-tanstack-router',
            '@tanstack/react-query': 'vendor-tanstack-query',
            '@tanstack/query-core': 'vendor-tanstack-query',
            '@tuyau/react-query': 'vendor-tanstack-query',
            'lucide-react': 'vendor-icons',
            recharts: 'vendor-recharts',
            jotai: 'vendor-state',
            zod: 'vendor-utils',
            ahooks: 'vendor-utils',
          }
          if (groups[pkg]) return groups[pkg]
          return 'vendor'
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  }
})

export default config
