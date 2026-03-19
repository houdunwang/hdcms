import Config from '#core/models/config'
import ConfigTransformer from '#transformers/config_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class ConfigsController {

	async all({ serialize }: HttpContext) {
		const configs = await Config.all()
		return serialize(ConfigTransformer.transform(configs))
	}

	async common({ serialize }: HttpContext) {
		// await new Promise(r => setTimeout(r, 2000))
		const configs = await Config.query().where('system', false)
		return serialize(ConfigTransformer.transform(configs))
	}

	async store(ctx: HttpContext) {
		const data = ctx.request.all() as Record<string, any>
		Object.entries(data).forEach(([name, value]) => {
			Config.updateOrCreate({ name }, { value })
		})
		return ctx.serialize(ConfigTransformer.transform(await Config.all()))
	}
}