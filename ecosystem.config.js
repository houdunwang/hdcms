module.exports = {
	apps: [
		{
			name: 'admin', // 应用程序名称
			cwd: './packages/admin', // 应用程序运行的工作目录
			script: './build/bin/server.js', // 应用程序的启动脚本路径
			instances: 'max', // 开启的实例数量，'max' 为根据 CPU 核心数自动设置
			exec_mode: 'cluster', // 运行模式，'cluster' 为集群模式，利用多核 CPU 提高性能
			autorestart: true, // 进程崩溃后是否自动重启
			watch: false, // 是否启用文件监听重启，生产环境通常关闭
			max_memory_restart: '1G', // 占用内存超过该值时自动重启
			env: { // 环境变量配置
				// 默认环境变量配置
				NODE_ENV: 'production', // 设置运行环境为生产环境
				PORT: 3333, // 设置应用程序监听的端口号
				HOST: '0.0.0.0' // 设置应用程序监听的主机地址
			},
		}
	]
} 
