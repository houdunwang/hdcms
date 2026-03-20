import vine from '@vinejs/vine'
import { validateProvider } from './config/validateProvider.ts'

export const packageValidator = vine.create(
  vine.object({
    title: vine.string().unique(async (db, value, field) => {
      if (value == field.meta.package?.title) return true
      const isExists = await db.from('packages').where('title', value).first()
      return !isExists
    }),
    ad: vine.string(),
    feature: vine.string(),
    months: vine.number().min(1).max(100),
    state: vine.boolean(),
    price: vine.number().max(9999999.99).positive().transform((value) => value.toFixed(2)),
    originalPrice: vine.number().max(9999999.99).positive().optional().transform((value) => value.toFixed(2))
  })
)

packageValidator.messagesProvider = validateProvider({
  messages: {
    'title.unique': '套餐名称已经被使用',
  },
  fields: {
    title: '套餐名称',
    ad: '广告语',
    price: '价格',
    state: '套餐开启状态',
    months: '会员月数',
  },
})
