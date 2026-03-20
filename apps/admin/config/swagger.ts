// for AdonisJS v6
import path from 'node:path'
import url from 'node:url'
// ---

export default {
  // path: process.cwd() + '/', // for AdonisJS v6
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  title: 'Foo', // use info instead
  version: '3.0.0', // use info instead
  description: ' TypeScript 全栈、开箱即用、面向生产的工程基座。采用 Monorepo 架构，前后端统一类型与规范，专注业务而非重复造轮子。', // use info instead
  tagIndex: 1,
  productionEnv: 'production', // optional
  info: {
    title: 'HDCMS',
    version: '1.0.1',
    description: ' TypeScript 全栈、开箱即用、面向生产的工程基座。采用 Monorepo 架构，前后端统一类型与规范，专注业务而非重复造轮子。',
  },
  snakeCase: true,

  debug: true, // set to true, to get some useful debug output
  ignore: ['/core/swagger/*', '/'],
  preferredPutPatch: 'PUT', // if PUT/PATCH are provided for the same route, prefer PUT
  common: {
    parameters: {}, // OpenAPI conform parameters that are commonly used
    headers: {}, // OpenAPI conform headers that are commonly used
  },
  securitySchemes: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  authMiddlewares: ['auth', 'auth:api'], // optional
  defaultSecurityScheme: 'BearerAuth', // optional
  persistAuthorization: true, // persist authorization between reloads on the swagger page
  showFullPath: false, // the path displayed after endpoint summary
}
