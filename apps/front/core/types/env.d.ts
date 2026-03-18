interface ImportMetaEnv {
  readonly VITE_API_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
declare module '*.css'
declare module '*.scss'
declare module '*.less'
declare module '*.sass'
declare module 'nprogress/nprogress.css'
import 'dayjs/plugin/relativeTime'

