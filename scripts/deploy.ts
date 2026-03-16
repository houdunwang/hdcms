import { rm, cp, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const root = process.cwd()
const deployDir = resolve(root, '.deploy')

async function main() {
	console.log('🚀 开始部署构建流程...')

	// 1. 清理旧的构建目录和部署目录
	console.log('🧹 清理旧目录...')
	await rm(deployDir, { recursive: true, force: true })
	// 清理 build 目录以确保干净构建
	const rootBuildDir = resolve(root, 'build')
	if (existsSync(rootBuildDir)) {
		await rm(rootBuildDir, { recursive: true, force: true })
	}

	// 2. 执行构建
	console.log('🔨 执行构建 (pnpm run build --force)...')
	try {
		// 使用 --force 以确保文件被生成（因为 turbo 可能无法缓存 workspace 外部的输出）
		execSync('pnpm run build --force', { stdio: 'inherit', cwd: root })
	} catch (error) {
		console.error('❌ 构建失败')
		process.exit(1)
	}

	// 3. 准备部署目录
	console.log('📂 准备部署目录...')
	await mkdir(deployDir, { recursive: true })
	// pnpm deploy 会自动创建目录，所以不需要预先创建 admin 子目录，但父目录 .deploy 需要存在

	// 4. 复制应用
	// 部署 Admin (使用 pnpm deploy 以包含 node_modules)
	console.log('📦 部署 Admin 应用 (pnpm deploy)...')
	try {
		execSync('pnpm --filter @app/admin deploy .deploy/admin --prod --legacy', {
			stdio: 'inherit',
			cwd: root
		})
	} catch (error) {
		console.error('❌ Admin 部署失败')
		process.exit(1)
	}

	// 复制 Front
	const frontSrc = resolve(root, 'build/apps/front')
	const frontDest = resolve(deployDir, 'front')
	if (existsSync(frontSrc)) {
		console.log('📦 复制 Front 应用...')
		await cp(frontSrc, frontDest, { recursive: true })
	} else {
		console.warn('⚠️ 未找到 Front 构建产物')
	}

	// 复制配置文件
	const configSrc = resolve(root, 'config/.env.production')
	const configDest = resolve(deployDir, 'config/.env')
	if (existsSync(configSrc)) {
		console.log('📦 复制生产环境配置文件...')
		const configDir = resolve(deployDir, 'config')
		await mkdir(configDir, { recursive: true })
		await cp(configSrc, configDest)
	} else {
		console.warn('⚠️ 未找到 config/.env.production 配置文件')
	}

	console.log('✅ 部署构建操作完成！')
	console.log(`📂 产物位置: ${deployDir}`)
}

main().catch(err => {
	console.error('❌ 发生错误:', err)
	process.exit(1)
})
