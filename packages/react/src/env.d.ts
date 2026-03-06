interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_NAME: string
  readonly VITE_DOMAIN: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
declare module '*.css'
