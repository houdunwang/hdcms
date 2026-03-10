// import type { HttpContext } from '@adonisjs/core/http'

import Package from "#core/models/package";
import PackageTransformer from "#transformers/package_transformer";
import { HttpContext } from "@adonisjs/core/http";

export default class PackagesController {
	async index({ serialize }: HttpContext) {
		return serialize(PackageTransformer.transform(await Package.all()))
	}
}