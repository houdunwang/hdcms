---
name: "vitest-testing"
description: "用于编写和生成前端 React 组件与 Hook 的测试代码。当用户要求测试 React 代码或编写测试用例时调用此技能。"
---

# Vitest 测试生成器

本技能用于为 React 前端项目（组件、Hooks 等）生成和编写测试代码。

## 核心规则
1. **语言要求**：所有的解释、回复以及测试用例（`describe`, `it`, `test` 的描述）都必须使用**中文**。
2. **测试框架**：强制使用 **Vitest** 和 **React Testing Library**，禁止使用 Jest。
3. **测试范围**：
   - **组件测试**：测试组件渲染、用户交互（事件触发）、条件渲染及错误边界等。
   - **Hook 测试**：测试状态初始化、更新机制以及副作用。

## 使用指南

当你被要求编写测试时，请遵循以下步骤：

1. **分析代码**：阅读待测试的组件或 Hook 代码，理解其输入（Props/参数）和输出（DOM/返回值）。
2. **制定测试计划**：列出需要覆盖的测试用例（如正常渲染、边界条件、异常处理）。
3. **编写测试文件**：
   - 导入必要的依赖：`import { describe, it, expect } from 'vitest';` 等。
   - 使用 `@testing-library/react` 中的 `render`, `screen`, `fireEvent`, `renderHook`, `act` 等工具。
   - 测试文件名使用 `.test.tsx` 或 `.test.ts` 后缀。
4. **验证和调整**：确保生成的测试用例覆盖了代码的关键逻辑。

## 代码示例

### 组件测试示例
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button 组件', () => {
  it('应该正确渲染按钮文本', () => {
    render(<Button>点击我</Button>);
    expect(screen.getByRole('button', { name: '点击我' })).toBeInTheDocument();
  });

  it('点击时应该触发 onClick 事件', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>点击我</Button>);
    fireEvent.click(screen.getByRole('button', { name: '点击我' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Hook 测试示例
```ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useCounter from './useCounter';

describe('useCounter Hook', () => {
  it('应该返回初始值', () => {
    const { result } = renderHook(() => useCounter(0));
    expect(result.current.count).toBe(0);
  });

  it('调用 increment 应该增加数值', () => {
    const { result } = renderHook(() => useCounter(0));
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });
});
```