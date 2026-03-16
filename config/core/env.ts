import fs from 'node:fs'

const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
let cachedEnv: Record<string, string> | null = null;

export const getEnvConfig = () => {
  if (!isNode) return { isDev: false, mode: 'production', selectedEnvFile: undefined }
  const isDev = process.argv.includes('--watch') || process.env.NODE_ENV === 'development'
  const mode = process.env.NODE_ENV || (isDev ? 'development' : 'production')

  let files = ['.env']
  if (mode === 'production') {
    files = ['.env.production', '../.env.production', '.env', '../.env']
  }

  const selectedEnvFile = files.find(file => fs.existsSync(file))

  return { isDev, mode, selectedEnvFile }
}

export const parseEnv = (envFile?: string) => {
  if (!isNode) return {}
  const { selectedEnvFile: defaultEnvFile } = getEnvConfig()
  const selectedEnvFile = envFile || defaultEnvFile

  if (!selectedEnvFile) return {}
  const content = fs.readFileSync(selectedEnvFile, 'utf-8')
  const env: Record<string, string> = {}
  content.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
    if (match && !line.trim().startsWith('#')) {
      const key = match[1]
      // 安全过滤：只注入 VITE_ 开头、PUBLIC_ 开头或 NODE_ENV 变量，以及明确允许的公开变量
      const allowedKeys = ['APP_NAME', 'APP_URL', 'NODE_ENV']
      if (!key.startsWith("VITE_") && !key.startsWith("PUBLIC_") && !allowedKeys.includes(key)) {
        return
      }

      let value = match[2] || ''
      if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
        value = value.replace(/\\n/gm, '\n')
      }
      value = value.replace(/(^['"]|['"]$)/g, '')
      env[match[1]] = value
    }
  })
  return env
}

export function env<T = any>(key: string, defaultValue?: T): T {
  if (isNode && process.env && key in process.env) {
    return process.env[key] as unknown as T
  }

  if (!key.startsWith('VITE_') && !key.startsWith('PUBLIC_') && !['APP_NAME', 'APP_URL', 'NODE_ENV'].includes(key)) {
    return defaultValue as T
  }

  const all = process.env.__HDCMS_ENV__
  // @ts-ignore
  if (all?.[key]) {
    // @ts-ignore
    return all[key]
  }

  // 如果构建时注入失败或没有值，尝试运行时读取（仅限 Node 环境）
  if (isNode) {
    if (!cachedEnv) {
      cachedEnv = parseEnv()
    }
    if (cachedEnv[key]) {
      return cachedEnv[key] as unknown as T
    }
  }

  return defaultValue as T
}
