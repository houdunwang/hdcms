import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'uploads'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('url').notNullable().comment('链接地址')
      table.string('name').notNullable().comment('原文件名')
      table.string('extension').notNullable().comment('扩展名')
      table.integer('size').unsigned().notNullable().comment('文件大小')
      table.string('driver', 32).notNullable().defaultTo('local').comment('驱动')
      table.string('mime', 30).nullable().comment('mime类型')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
