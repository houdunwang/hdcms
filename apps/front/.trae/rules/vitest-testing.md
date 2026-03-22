# React 测试规范

- **强制使用中文**: 回答、解释以及所有测试描述（如 `describe`, `it`）。
- **技术栈**: Vitest + React Testing Library。
- **组件测试**: 文件名 `*.test.tsx`。必须覆盖默认渲染与用户交互逻辑。优先使用语义化查询（`screen.getByRole`/`getByText`）。
- **Hook 测试**: 文件名 `*.test.ts`。使用 `renderHook` 与 `act` 测试初始状态、更新逻辑与副作用。
- **技能调用**: 当被要求编写、生成或修改测试代码时，必须优先调用并严格遵循 `vitest-testing` 技能。
