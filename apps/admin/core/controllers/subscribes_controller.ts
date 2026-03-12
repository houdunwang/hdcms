import Subscribe from "#core/models/subscribe";
import SubscribeTransformer from "#transformers/subscribe_transformer";
import { HttpContext } from "@adonisjs/core/http";

export default class SubscribesController {
	async index({ serialize, request }: HttpContext) {
		const subscribes = await Subscribe.query().paginate(request.input('page', 1))
		return serialize(SubscribeTransformer.paginate(subscribes, subscribes.getMeta()))
	}
}