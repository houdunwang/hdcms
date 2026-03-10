import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('orderable_type').notNullable().comment('端口类型，在 hdConfig.payProcess 的属性')
      table.bigInteger('orderable_id').unsigned().notNullable().comment('这笔订单的商品ID')
      table.string('sn').notNullable().comment('定单号')
      table.string('subject').notNullable().comment('订单描述')
      table.decimal('price', 8, 2).notNullable().comment('价格')
      table.boolean('pay_state').notNullable().defaultTo(false).comment('支付状态')
      table.string('pay_type').comment('支付方式: alipay wechat')
      table.string('trade_no').comment('支付平台单号')
      table.text('data').comment('其他数据')
      table.index(['orderable_type', 'orderable_id'])
      table.index(['user_id', 'sn'])
      table.timestamp('deleted_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
