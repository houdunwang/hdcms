import { BaseModel } from '@adonisjs/lucid/orm'
export class HdModel extends BaseModel {
  /**
   * 填充数据（自动过滤掉不存在的字段）
   */
  fillClean(data: Record<string, any>) {
    const columns = (this.constructor as typeof HdModel).$columnsDefinitions
    const cleanData: Record<string, any> = {}

    // 只保留存在的字段
    for (const [key, value] of Object.entries(data)) {
      if (columns.has(key)) {
        cleanData[key] = value
      }
    }
    // 调用原生 fill 方法
    return this.fill(cleanData as any)
  }
}
