import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'packages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 100).notNullable().comment('标题')
      table.string('ad', 100).notNullable().comment('一句广告语')
      table.json('feature').notNullable().comment('特点')
      table.smallint('months').notNullable().comment('会员月数')
      table.boolean('state').notNullable().defaultTo(true).comment('开启')
      table.decimal('price', 8, 2).notNullable().comment('价格')
      table.string('icon', 255).notNullable().comment('图片')
      table.boolean('recommend').notNullable().defaultTo(false).comment('推荐')
      table.decimal('original_price', 8, 2).nullable().comment('原价格')
      table.timestamp('deleted_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
