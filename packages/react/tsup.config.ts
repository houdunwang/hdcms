import { defineConfig } from 'tsup'
import { resolve } from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: resolve(__dirname, '../../.env') })

export default defineConfig({
  entry: {
    // index: 'src/index.ts',
    auth: 'src/auth/index.ts',
    common: 'src/common/index.ts',
    form: 'src/form/index.ts',
    hooks: 'src/hooks/index.ts',
    member: 'src/member/index.ts',
    pay: 'src/pay/index.ts',
    plugin: 'src/plugin/index.ts',
    provider: 'src/provider/index.ts',
    store: 'src/store/index.ts',
    theme: 'src/theme/index.ts',
    user: 'src/user/index.ts',
    wechat: 'src/wechat/index.ts',
  },
  dts: true,
  format: ['esm'],
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  external: ['shadcn/tailwind.css', 'tw-animate-css', '@fontsource-variable/inter'],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || ''),
  },
})
