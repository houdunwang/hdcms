import Subscribe from '#core/models/subscribe'
import SubscribePolicy from '#core/policies/subscribe_policy'
import SubscribeTransformer from '#transformers/subscribe_transformer'
import { type HttpContext } from '@adonisjs/core/http'

export default class SubscribesController {
  async index({ serialize, request }: HttpContext) {
    const field = request.input('field')
    const keyword = request.input('keyword')
    const page = request.input('page', 1)
    const subscribes = await Subscribe.query().preload('user').if(keyword, (query) => {
      if (field === 'userId') {
        query.where('user_id', Number(keyword) || 0)
      } else {
        query.where(field, 'like', `%${keyword}%`)
      }
    }).paginate(page)

    return serialize(SubscribeTransformer.paginate(subscribes, subscribes.getMeta()))
  }

  async show({ bouncer, params, serialize }: HttpContext) {
    const subscribe = await Subscribe.findOrFail(params.id)
    await bouncer.with(SubscribePolicy).authorize('show', subscribe)
    return serialize(SubscribeTransformer.transform(subscribe))
  }
}
