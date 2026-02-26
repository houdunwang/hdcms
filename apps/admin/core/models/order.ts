import User from '#models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare sn: string

  @column()
  declare orderableType: string

  @column()
  declare orderableId: number

  @column()
  declare subject: string

  @column()
  declare price: number

  @column()
  declare payState: boolean

  @column()
  declare payType: string | null

  @column()
  declare tradeNo: string | null

  @column()
  declare data: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}