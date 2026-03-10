import Subscribe from "#core/models/subscribe";
import SubscribeTransformer from "#transformers/subscribe_transformer";
import { HttpContext } from "@adonisjs/core/http";

export default class SubscribesController {
	async index({ serialize }: HttpContext) {
		return serialize(SubscribeTransformer.transform(await Subscribe.all()))
	}
}