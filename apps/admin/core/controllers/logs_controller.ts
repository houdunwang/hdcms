import { LogService } from '#services/log_service';
import { inject } from '@adonisjs/core';
import { HttpContext } from '@adonisjs/core/http';
import app from '@adonisjs/core/services/app';
import drive from "@adonisjs/drive/services/main";

@inject()
export default class LogsController {
	constructor(protected LogService: LogService) { }

	/**
	 * @handle
	 * @tag 日志管理
	 * @operationId logs
	 * @summary 获取日志列表
	 * @description 获取日志列表
	 */
	async handle({ serialize }: HttpContext) {
		const disk = drive.use('fs')
		const response = await disk.listAll('logs' as any)
		const files = Array.from(response.objects).map(item => {
			if (item.isFile) {
				return item.key;
			}
		}).reverse()
		const file = files[0]
		if (file) {
			const content = await this.LogService.readFirstLines(app.makePath('storage/' + file))
			return serialize(content)
		}
	}
}
