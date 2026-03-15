import Subscribe from '#core/models/subscribe'
import SubscribeTransformer from '#transformers/subscribe_transformer'
import { type HttpContext } from '@adonisjs/core/http'

export default class SubscribesController {
  async index({ serialize, request }: HttpContext) {
    const field = request.input('field')
    const keyword = request.input('keyword')
    const page = request.input('page', 1)
    const db = Subscribe.query().preload('user')
    if (keyword) {
      if (field === 'userId') {
        db.where('user_id', Number(keyword))
      } else {
        db.where(field, 'like', `%${keyword}%`)
      }
      const subscribes = await db.paginate(page)
      return serialize(SubscribeTransformer.paginate(subscribes, subscribes.getMeta()))
    }
    const subscribes = await db.paginate(page)
    return serialize(SubscribeTransformer.paginate(subscribes, subscribes.getMeta()))
  }

  async show({ params, serialize }: HttpContext) {
    const subscribe = await Subscribe.findOrFail(params.id)
    return serialize(SubscribeTransformer.transform(subscribe))
  }
}
