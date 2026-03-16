import { defineConfig } from 'tsdown'
import pluginBabel from '@rollup/plugin-babel'
import { parseEnv, getEnvConfig } from './core/env.ts'

const { isDev, mode, selectedEnvFile } = getEnvConfig()

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
  define: {
    'process.env.__APP_ENV__': JSON.stringify(parseEnv(selectedEnvFile)),
  },
  deps: {
    skipNodeModulesBundle: true,
  },
  entry: [
    'core/index.ts',
  ],
  // unbundle: true,
  format: ['esm'],
  // exports: true,
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
