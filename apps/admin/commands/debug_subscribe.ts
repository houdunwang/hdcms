import { BaseCommand } from '@adonisjs/core/ace'
import { SubscribeService } from '#core/services/subscribe_service'

export default class DebugSubscribe extends BaseCommand {
  static commandName = 'debug:subscribe'
  static description = 'Debug subscribe query'
  static options = {
    startApp: true
  }

  async run() {
    this.logger.info('Starting debug...')
    const service = new SubscribeService()
    const count = await service.getTotalValidSubscribers()
    this.logger.info(`Valid subscribers count: ${count}`)

    const total = await service.getTotalSubscribers()
    this.logger.info(`Total subscribers count: ${total}`)
  }
}
