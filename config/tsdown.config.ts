import { defineConfig } from 'tsdown'
import pluginBabel from '@rollup/plugin-babel'
import fs from 'node:fs'

const isDev = process.argv.includes('--watch') || process.env.NODE_ENV === 'development'
const mode = process.env.NODE_ENV || (isDev ? 'development' : 'production')
const preferredEnvFile = mode === 'production' ? '.env.production' : '.env'
const selectedEnvFile = fs.existsSync(preferredEnvFile) ? preferredEnvFile : undefined

export default defineConfig({
  dts: true,
  sourcemap: true,
  clean: !isDev,
  minify: !isDev,
  envFile: selectedEnvFile,
  envPrefix: [''],
  env: {
    NODE_ENV: mode,
  },
  deps: {
    skipNodeModulesBundle: true,
  },
  entry: [
    'config/index.ts',
  ],
  // unbundle: true,
  format: ['esm'],
  exports: true,
  plugins: [
    !isDev &&
    pluginBabel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      parserOpts: {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
      },
      plugins: ['babel-plugin-react-compiler'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ].filter(Boolean) as any,
})
