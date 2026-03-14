import { defineConfig } from 'tsdown'
import pluginBabel from '@rollup/plugin-babel'

const isDev = process.argv.includes('--watch') || process.env.NODE_ENV === 'development'

export default defineConfig({
  dts: true,
  sourcemap: true,
  clean: !isDev,
  minify: !isDev,
  deps: {
    skipNodeModulesBundle: true,
    // neverBundle: [/^@\/components/]
  },
  // watch: ['src/**/*.ts', 'src/**/*.tsx'],
  // entry: {
  //   auth: 'src/auth/index.ts',
  //   common: 'src/common/index.ts',
  //   form: 'src/form/index.ts',
  //   hooks: 'src/hooks/index.ts',
  //   member: 'src/member/index.ts',
  //   pay: 'src/pay/index.ts',
  //   provider: 'src/provider/index.ts',
  //   store: 'src/store/index.ts',
  //   theme: 'src/theme/index.ts',
  //   user: 'src/user/index.ts',
  //   wechat: 'src/wechat/index.ts',
  //   types: 'src/types/index.ts',
  //   package: 'src/package/index.ts',
  // },
  entry: [
    'src/auth/index.ts',
    'src/common/index.ts',
    'src/form/index.ts',
    'src/hooks/index.ts',
    'src/pay/index.ts',
    'src/provider/index.ts',
    'src/store/index.ts',
    'src/theme/index.ts',
    'src/user/index.ts',
    'src/wechat/index.ts',
    'src/types/index.ts',
    'src/package/index.ts',
    'src/layouts/index.ts',
    'src/assets/global.css',
    'src/assets/nprogress.css',
  ],
  unbundle: true,
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
