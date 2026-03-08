const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const os = require('os')

const home = os.homedir()

const candidates = []
if (process.env.FRPC_BIN) {
  candidates.push({
    bin: process.env.FRPC_BIN,
    config: process.env.FRPC_CONFIG || ''
  })
}

function add(dir) {
  const base = path.join(home, 'code', 'frp', dir)
  const bin = process.platform === 'win32' ? path.join(base, 'frpc.exe') : path.join(base, 'frpc')
  const config = path.join(base, 'frpc.toml')
  candidates.push({ bin, config })
}

add('mac')
add('linux')
add('win')
add('windows')

function start(bin, config) {
  if (!fs.existsSync(bin)) return false
  const args = fs.existsSync(config) ? ['-c', config] : []
  const p = spawn(bin, args, { stdio: 'inherit' })
  p.on('error', () => {
    console.log('frpc 未找到或启动失败，已跳过')
    process.exit(0)
  })
  p.on('close', () => {
    process.exit(0)
  })
  return true
}

for (const c of candidates) {
  if (start(c.bin, c.config)) {
    return
  }
}

console.log('frpc 未找到或启动失败，已跳过')
process.exit(0)
