import { OrderSchema } from '#database/schema'
import User from '#models/user'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Order extends OrderSchema {
	@belongsTo(() => User)
	declare user: BelongsTo<typeof User>
}
