import vine from '@vinejs/vine'
import { validateProvider } from './config/validateProvider.ts'

export const updatePackageValidator = vine.create(
	vine.object({
		title: vine.string()
			.unique(async (db, value, field) => {
				if (value == field.meta.package.title) return true
				const isExists = await db.from('packages').where('title', value).first()
				return !isExists
			}),
		ad: vine.string(),
		feature: vine.string(),
		months: vine.number(),
		state: vine.boolean(),
		price: vine.number().positive(),
	})
)

updatePackageValidator.messagesProvider = validateProvider({
	messages: {
		'title.unique': '套餐名称已经被使用',
	},
	fields: {
		title: '套餐名称',
		ad: '广告语',
		price: '价格',
	},
})