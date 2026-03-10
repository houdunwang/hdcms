#!/usr/bin/env node

/**
 * houdunren-vue
 * 后盾人前端脚手架
 * @author 向军大叔 <https://www.houdurnen.com>
 */
import chalk from 'chalk';
import figlet from 'figlet';
import fs from 'fs';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import { downloadTemplate } from "giget";

let spinnerRef;
process.on('SIGINT', () => {
	try {
		if (spinnerRef) {
			spinnerRef.error({ text: '操作已取消' });
		}
	} catch { }
	process.exit(0);
});

figlet('hdcms.com', async function (err, data) {
	//打印文字图案
	console.log(data);
	//可点击链接
	console.log(
		chalk.green(
			`欢迎使用 hdcms . 现代 TypeScript 全栈、开箱即用、面向生产的工程基座。采用 Monorepo 架构，前后端统一类型与规范，专注业务而非重复造轮子。`
		)
	);

	//询问用户
	let message;
	try {
		message = await inquirer.prompt({
			name: 'dirname',
			type: 'input',
			message: '请输入目录名',
			default() {
				return 'hdcms';
			}
		});
	} catch (e) {
		if (e && (e.name === 'ExitPromptError' || (e.message && e.message.includes('User force closed')))) {
			console.log(chalk.yellow('操作已取消'));
			return;
		}
		throw e;
	}

	//目录是否已经存在
	const dirIsExists = fs.existsSync(message.dirname);

	if (dirIsExists) {
		console.log(chalk.redBright('目录已经存在'));
	} else {
		//显示下载动画
		const spinner = createSpinner('开始下载...').start();
		spinnerRef = spinner;
		//下载git代码
		try {
			const { source, dir } = await downloadTemplate("github:houdunwang/hdcms#master", {
				dir: message.dirname
			});
			spinner.success({
				text: '项目创建成功，请依次执行以下命令',
				mark: ':)'
			});
			console.log(chalk.red.bold(`cd ${message.dirname}`))
			console.log(chalk.blue.bold('pnpm install'));
			console.log(chalk.green.bold('pnpm run dev'));
			spinnerRef = null;
			return;
		} catch (error) {
			spinner.error({ text: '下载失败，请检查网络' });
			spinnerRef = null;
		}
	}
});
