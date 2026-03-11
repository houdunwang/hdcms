interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly APP_NAME?: string
  readonly APP_URL?: string
  readonly API_URL?: string
  readonly NODE_ENV?: string
  readonly PORT?: string
	[key: string]: string | undefined
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
