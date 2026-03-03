import { configApp } from '@adonisjs/eslint-config'
export default [
  ...configApp(),
  // Enforce no newline before property access to keep "router.group()" on one line.
  {
    rules: {
      'no-whitespace-before-property': 'error',
    },
  },
  // Allow custom formatting in routes files by disabling Prettier enforcement there.
  {
    files: ['core/routes/**/*.ts'],
    rules: {
      'prettier/prettier': 'off',
    },
  },
]
