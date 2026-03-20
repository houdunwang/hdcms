/**
 * 作者: 向军大叔
 * 邮箱: 2300071698@qq.com
 * 直播: 抖音、B站 搜索 后盾云
 */
import Config from '#core/models/config'
import ConfigPolicy from '#core/policies/config_policy'
import ConfigTransformer from '#transformers/config_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class ConfigsController {
	async all({ bouncer, serialize }: HttpContext) {
		await bouncer.with(ConfigPolicy).authorize('all')
		const configs = await Config.all()
		return serialize(ConfigTransformer.transform(configs))
	}

	async common({ serialize }: HttpContext) {
		const configs = await Config.query().where('system', false)
		return serialize(ConfigTransformer.transform(configs))
	}

	async store({ bouncer, request, serialize }: HttpContext) {
		await bouncer.with(ConfigPolicy).authorize('store')
		const data = request.all() as Record<string, any>
		Object.entries(data).forEach(([name, value]) => {
			Config.updateOrCreate({ name }, { value })
		})
		return serialize(ConfigTransformer.transform(await Config.all()))
	}
}