import { defineConfig } from 'tsdown'

const isDev = process.argv.includes('--watch') || process.env.NODE_ENV === 'development'

export default defineConfig({
	dts: true,
	sourcemap: true,
	clean: !isDev,
	minify: !isDev,
	deps: {
		skipNodeModulesBundle: true,
	},
	entry: ['src/**/*.ts'],
	unbundle: true,
	format: ['esm'],
	exports: false,
})