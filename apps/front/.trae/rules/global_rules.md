Trae 全局规则（前端项目）
========================

目标与范围
----------
- 统一工程化流程与代码质量标准，提升可读性、可维护性与交付效率。  
- 适用于 apps/front 下所有代码与文档；自动生成文件（如 src/routeTree.gen.ts）按规则声明豁免。

基本原则
--------
- 类型优先：全量采用 TypeScript，避免 any 与隐式类型。  
- 单一职责：组件/函数保持聚焦，超过 200 行需考虑拆分。  
- 可演进：优先无破坏性变更；必要时提供迁移说明与兼容层。  
- 自动化优先：尽量用脚本与工具替代手工流程。

目录与命名
----------
- 目录：src 下按功能域组织（components、hooks、lib、routes）。  
- 别名：使用 tsconfig.json 中的 @ 与 @core 路径别名。  
- 命名：文件与目录使用小写中划线或驼峰；React 组件文件使用 PascalCase。  
- 导出：优先具名导出，避免默认导出造成重命名歧义。

代码风格（React + TS）
---------------------
- 组件：
  - 函数组件优先；首字母大写，文件名与导出名一致。  
  - Props 使用显式类型，必要时配合 zod 在运行时校验外部数据。  
  - 副作用只放在 useEffect/useLayoutEffect，确保依赖完整。  
  - 自定义 Hook 使用 useXxx 命名，必须是纯函数、无隐藏副作用。
- 状态：
  - 局部状态优先；跨组件状态使用 jotai 或 TanStack Query（服务端数据）。  
  - 禁止滥用 context；共享只读配置另行封装 provider。
- 导入顺序：
  1. Node/浏览器内置模块  
  2. 第三方依赖  
  3. 工作区/别名导入（@、@core、#）  
  4. 相对路径（从短到长）
- 样式：
  - Tailwind 优先；类名通过 clsx/cva 组合；避免内联 style。  
  - 组件库统一使用 shadcn 生成的 UI 与 Radix 交互基元。

类型与错误处理
--------------
- 严格选项：保持 tsconfig.json 中的 strict、noUnused*、noFallthrough 等为开启。  
- API 与非受信数据：使用 zod 校验并在边界处理错误；内部流转使用类型守卫。  
- 不吞错：禁止空 catch；业务层面错误转译为具备上下文的信息对象。

性能与可访问性
--------------
- 列表与表格：长列表使用虚拟化；避免在 render 中创建新函数/对象。  
- 资源：图片懒加载、分辨率与格式自适应；优先动态 import 进行代码分割。  
- A11y：为交互控件提供可聚焦与键盘导航；图像具备 alt；颜色对比符合 WCAG AA。

安全与配置
----------
- 秘钥与凭证不入库；通过 vite envDir 指向 ../../config/，按环境注入。  
- 不在日志中输出敏感信息；浏览器存储采用最小化策略并设置有效期。

提交与分支
----------
- Conventional Commits：
  - feat: 新功能  
  - fix: 修复  
  - docs: 文档  
  - style: 代码风格（无逻辑变更）  
  - refactor: 重构  
  - test: 测试  
  - build/ci/chore/revert: 其他
- 作用域示例：front、routes、components、hooks、lib、build。  
- 分支策略：  
  - main：发布稳定分支  
  - develop：日常集成  
  - feature/*：需求分支  
  - hotfix/*：生产紧急修复  
  - release/*：发布准备

质量门禁（本仓库约定）
--------------------
- 构建：pnpm run build（Vite，输出到 build/ 目录）。  
- 测试：pnpm run test（Vitest）。  
- 类型：建议新增脚本 typecheck（tsc --noEmit）。  
- Lint/格式化：建议新增 lint 与 format 脚本；生成文件应被忽略。  
- PR 合入前应满足：构建成功、测试全绿、类型检查通过、关键变更经双人 Review。

自动生成与豁免
--------------
- TanStack Router 生成文件 src/routeTree.gen.ts：不手动修改；从 Lint/Format 中豁免。  
- 第三方产出目录（build、node_modules、public）：不纳入检查范围。

推荐工具配置（可后续落地）
------------------------
- ESLint（Flat Config）：TS、React Hooks、import 排序（simple-import-sort）。  
- Prettier v3：统一格式，启用 prettier-plugin-tailwindcss 排序类名。  
- 脚本建议：
  - "typecheck": "tsc -p tsconfig.json --noEmit"  
  - "lint": "eslint . --ext .ts,.tsx"  
  - "lint:fix": "eslint . --ext .ts,.tsx --fix"  
  - "format": "prettier . --write"  
  - "format:check": "prettier . --check"

PR 自检清单
----------
- [ ] 变更聚焦且可回滚；无无关提交  
- [ ] 类型完善、无 any/忽略抑制  
- [ ] UI 与交互通过手测，包含空态与异常流  
- [ ] 文案、可访问性与主题模式校验通过  
- [ ] 性能无明显回退（列表/图片/依赖）  
- [ ] 变更说明与迁移指南（如有破坏性调整）

附：项目上下文速览
----------------
- 构建：Vite（端口 3000、host 0.0.0.0、allowedHosts: client.hdcms.com）。  
- 技术栈：React 19、TypeScript、TanStack Router/Query、Tailwind CSS 4。  
- 别名：@ 指向 src。  
- 生成文件：src/routeTree.gen.ts。

落地与迭代
----------
- 如需，我可进一步落地 ESLint/Prettier 脚本与配置，并批量格式化现有代码；也可为 CI 添加门禁检查。

