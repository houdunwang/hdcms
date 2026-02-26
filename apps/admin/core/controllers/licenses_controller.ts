import type { HttpContext } from '@adonisjs/core/http'

export default class LicensesController {

  async handle({ }: HttpContext) {
    return {
      status: true,
      message: 'license validate success',
    }
  }
}