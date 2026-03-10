import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name', 255).nullable().unique().comment('用户名')
      table.string('password', 255).nullable()
      table.string('nickname', 255).nullable().comment('昵称')
      table.string('email', 255).nullable().unique()
      table.string('mobile', 255).nullable().unique()
      table.tinyint('sex').notNullable().defaultTo(1).comment('性别')
      table.string('address', 255).nullable().comment('地址')
      table.string('real_name', 255).nullable().comment('真实姓名')
      table.string('avatar', 255).nullable()
      table.string('home', 255).nullable()
      table.string('weibo', 255).nullable()
      table.string('wechat', 255).nullable()
      table.string('github', 255).nullable()
      table.string('qq', 255).nullable()
      table.string('openid', 255).nullable().unique().comment('微信 openid')
      table.string('unionid', 255).nullable().unique().comment('微信 unionid')
      table.boolean('is_lock').notNullable().defaultTo(false).comment('是否锁定')
      table.timestamp('deleted_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
