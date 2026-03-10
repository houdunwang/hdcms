import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: {
    tsgo: false,
  },
  deps: {
    skipNodeModulesBundle: true,
  },
  entry: {
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
    types: 'src/types/index.ts',
    package: 'src/package/index.ts',
  },
  format: ['esm'],
  exports: true,
  // ...config options
})
