import { defineConfig } from '@adonisjs/cors'
import * as config from '@hdcms/config'
/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */
const corsConfig = defineConfig({
  enabled: true,

  /**
   * Set origin to true to allow requests from any origin, or specify
   * allowed origins. For production, use environment variables to
   * configure allowed origins.
   */
  // origin: true,
  origin: (requestOrigin) => {
    if (!requestOrigin) return false
    try {
      const { hostname } = new URL(requestOrigin)
      if (hostname === 'localhost') {
        return requestOrigin
      }
    } catch { }
    return [config.frp.clientUrl].includes(requestOrigin) ? requestOrigin : false
  },

  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
