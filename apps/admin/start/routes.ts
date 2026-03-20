/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import "#core/routes/index"
import { currentDirectory } from '#core/helper'
import { resolve } from 'node:path'
import { readFile } from 'node:fs/promises'

router.any('/*', async ({ request, response }) => {
  // 排除 /core 接口请求，保持正常的 404 JSON 响应
  if (request.url().startsWith('/core') || request.url().startsWith('/api')) {
    return response.notFound({ message: 'API Route not found' })
  }

  // 兜底所有非 API 请求，将 React 的 index.html 响应给前端，由前端 React-Router 接管
  try {
    const htmlPath = resolve(currentDirectory(import.meta.url), '../public/index.html')
    const html = await readFile(htmlPath, 'utf-8')
    // 返回前设置正确的 Content-Type 为 html
    return response.header('Content-Type', 'text/html').send(html)
  } catch (error) {
    return response.notFound('<div style="font-size: 25px; padding:50px;"> 项目未构建！根目录执行 `pnpm run deploy` </div>')
  }
})
