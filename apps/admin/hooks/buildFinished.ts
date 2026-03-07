import { hooks } from '@adonisjs/core/app'
// import { cpSync } from 'node:fs'
// 编译完成时执行的hook
export default hooks.buildFinished(() => {
  // cpSync('./database/factories/data', './build/database/factories/data', {
  // 	recursive: true,
  // })
  // cpSync('./.env.production', './build/.env')
  console.log(`编译成功`)
})
