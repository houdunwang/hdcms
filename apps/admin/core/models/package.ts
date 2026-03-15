import { PackageSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'

export default class Package extends PackageSchema {
	@column({
		consume: (value: any) => Boolean(value),
	})
	declare state: boolean
}