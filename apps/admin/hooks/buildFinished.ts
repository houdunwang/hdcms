import { hooks } from '@adonisjs/core/app'
export default hooks.buildFinished(() => {
  console.log(`编译成功`)
})
