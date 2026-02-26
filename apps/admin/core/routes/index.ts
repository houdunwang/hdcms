import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 获取 routes/core 目录
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const files = fs.readdirSync(__dirname)

for (const file of files) {
  if (file.startsWith('.')) {
    continue
  }

  if ((file.endsWith('.ts') || file.endsWith('.js')) && !file.endsWith('.d.ts')) {
    // 排除所有的 index.ts 和 index.js
    if (file === 'index.ts' || file === 'index.js') {
      continue
    }
    await import(path.resolve(__dirname, file))
  }
}
