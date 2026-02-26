// for AdonisJS v6
import path from 'node:path'
import url from 'node:url'
// ---

export default {
  // path: process.cwd() + '/', // for AdonisJS v6
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  title: 'Foo', // use info instead
  version: '3.0.0', // use info instead
  description: '', // use info instead
  tagIndex: 2,
  productionEnv: 'production', // optional
  info: {
    title: '后盾全栈',
    version: '3.0.0',
    description: '使用adonis与react 构建的全栈脚手架',
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
