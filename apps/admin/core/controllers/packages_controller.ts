import Package from '#core/models/package'
import { packageValidator } from '#core/validators/package'
import PackageTransformer from '#transformers/package_transformer'
import { type HttpContext } from '@adonisjs/core/http'

export default class PackagesController {
  async index({ serialize, request, auth }: HttpContext) {
    const db = Package.query()
    db.if(request.input('state'), (query) => {
      query.where('state', request.input('state'))
    })
    db.if(!auth.isAuthenticated || !auth.user!.isAdmin, (query) => {
      query.where('state', true)
    })
    return serialize(PackageTransformer.transform(await db))
  }

  async show({ params, serialize }: HttpContext) {
    return serialize(PackageTransformer.transform(await Package.findOrFail(params.id)))
  }

  async update({ params, request, serialize }: HttpContext) {
    const model = await Package.findOrFail(params.id)
    const payload = await request.validateUsing(packageValidator, {
      meta: {
        package: model,
      },
    })
    model.merge({ ...payload })
    await model.save()
    return serialize(PackageTransformer.transform(model))
  }

  async store({ request, serialize }: HttpContext) {
    const payload = await request.validateUsing(packageValidator)
    const model = await Package.create({ ...payload })
    return serialize(PackageTransformer.transform(model))
  }
}
