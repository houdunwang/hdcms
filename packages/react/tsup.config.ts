import { defineConfig } from 'tsup'
import { resolve } from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: resolve(__dirname, '../../.env') })

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    components: 'src/components.ts',
    hooks: 'src/hooks.ts',
    plugin: 'src/plugin.ts',
    store: 'src/store.ts',
    enum: 'src/enum.ts',
    provider: 'src/provider.ts',
    member: 'src/member.ts',
    form: 'src/form.ts',
  },
  dts: true,
  format: ['esm', 'cjs'],
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  external: ['shadcn/tailwind.css', 'tw-animate-css', '@fontsource-variable/inter'],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || ''),
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || '')
  },
})
