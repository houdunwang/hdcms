import Package from "#core/models/package";
import { updatePackageValidator } from "#core/validators/package";
import PackageTransformer from "#transformers/package_transformer";
import { HttpContext } from "@adonisjs/core/http";

export default class PackagesController {
	async index({ serialize }: HttpContext) {
		return serialize(PackageTransformer.transform(await Package.all()))
	}

	async show({ params, serialize }: HttpContext) {
		return serialize(PackageTransformer.transform(await Package.findOrFail(params.id)))
	}

	async update({ params, request, serialize }: HttpContext) {
		const model = await Package.findOrFail(params.id)
		const payload = await request.validateUsing(updatePackageValidator, {
			meta: {
				package: model
			}
		})
		model.merge({ ...payload, price: payload.price.toString() })
		await model.save()
		return serialize(PackageTransformer.transform(model))
	}
}