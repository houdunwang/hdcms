import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	envDir: resolve(__dirname, '../../'),
})
