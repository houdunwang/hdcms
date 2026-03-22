/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRequestClient } from './useRequestClient';
import { toast } from 'sonner';
import { useSetAtom } from 'jotai';
import { createTuyau } from '@tuyau/core/client';

// 模拟外部依赖
vi.mock('sonner', () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
		info: vi.fn(),
	},
}));

vi.mock('jotai', () => ({
	useSetAtom: vi.fn(),
}));

vi.mock('@tuyau/core/client', () => ({
	createTuyau: vi.fn((options) => options),
}));

vi.mock('@app/admin/registry', () => ({
	registry: {},
}));

vi.mock('#core/store/fieldErrorAtom.ts', () => ({
	fieldErrorAtom: {},
}));

describe('useRequestClient Hook', () => {
	let mockSetFieldError: ReturnType<typeof vi.fn>;
	let originalLocation: Location;

	beforeEach(() => {
		mockSetFieldError = vi.fn();
		vi.mocked(useSetAtom).mockReturnValue(mockSetFieldError);
		vi.clearAllMocks();

		// 模拟 window.location，用于测试跳转行为
		originalLocation = window.location;
		Object.defineProperty(window, 'location', {
			value: { href: 'http://localhost/' },
			writable: true,
		});
	});

	afterEach(() => {
		// 恢复 window.location
		Object.defineProperty(window, 'location', {
			value: originalLocation,
			writable: true,
		});
	});

	it('应该正确创建并返回带有正确配置的 Tuyau 客户端', () => {
		const { result } = renderHook(() => useRequestClient());

		expect(createTuyau).toHaveBeenCalled();
		const config = result.current as any;
		expect(config.baseUrl).toBe('http://localhost:3333');
		expect(config.timeout).toBe(10000);
		expect(config.hooks).toBeDefined();
	});

	it('beforeRequest 钩子应该清空表单错误状态', () => {
		const { result } = renderHook(() => useRequestClient());
		const config = result.current as any;
		const beforeRequestHook = config.hooks.beforeRequest[0];

		beforeRequestHook({});

		expect(mockSetFieldError).toHaveBeenCalledWith({});
	});

	it('afterResponse 钩子在响应成功且有 message 时应该显示成功提示', async () => {
		const { result } = renderHook(() => useRequestClient());
		const config = result.current as any;
		const afterResponseHook = config.hooks.afterResponse[0];

		const mockResponse = {
			ok: true,
			json: vi.fn().mockResolvedValue({ data: { message: '操作成功' } })
		};

		await afterResponseHook({}, {}, mockResponse);

		expect(toast.success).toHaveBeenCalledWith('操作成功');
	});

	it('afterResponse 钩子在没有 message 时不显示提示', async () => {
		const { result } = renderHook(() => useRequestClient());
		const config = result.current as any;
		const afterResponseHook = config.hooks.afterResponse[0];

		const mockResponse = {
			ok: true,
			json: vi.fn().mockResolvedValue({ data: {} })
		};

		await afterResponseHook({}, {}, mockResponse);

		expect(toast.success).not.toHaveBeenCalled();
	});

	it('beforeError 钩子在没有响应体时应该提示网络连接失败', async () => {
		const { result } = renderHook(() => useRequestClient());
		const config = result.current as any;
		const beforeErrorHook = config.hooks.beforeError[0];

		const mockError = {};

		await beforeErrorHook(mockError);

		expect(toast.error).toHaveBeenCalledWith('网络连接失败');
	});

	it('beforeError 钩子在 401 状态码时应该跳转到登录页', async () => {
		const { result } = renderHook(() => useRequestClient());
		const config = result.current as any;
		const beforeErrorHook = config.hooks.beforeError[0];

		const mockError = {
			response: {
				status: 401,
				clone: () => ({
					json: vi.fn().mockResolvedValue({})
				})
			}
		};

		await beforeErrorHook(mockError);

		expect(window.location.href).toBe('/auth');
	});

	it('beforeError 钩子在 429 状态码时应该提示请求频繁信息', async () => {
		const { result } = renderHook(() => useRequestClient());
		const config = result.current as any;
		const beforeErrorHook = config.hooks.beforeError[0];

		const mockError = {
			response: {
				status: 429,
				clone: () => ({
					json: vi.fn().mockResolvedValue({
						errors: [{ message: '请求过于频繁' }]
					})
				})
			}
		};

		await beforeErrorHook(mockError);

		expect(toast.info).toHaveBeenCalledWith('请求过于频繁');
	});

	it('beforeError 钩子在 403 状态码时应该提示没有操作权限', async () => {
		const { result } = renderHook(() => useRequestClient());
		const config = result.current as any;
		const beforeErrorHook = config.hooks.beforeError[0];

		const mockError = {
			response: {
				status: 403,
				clone: () => ({
					json: vi.fn().mockResolvedValue({})
				})
			}
		};

		await beforeErrorHook(mockError);

		expect(toast.error).toHaveBeenCalledWith('没有操作权限');
	});

	it('beforeError 钩子在 422 状态码时应该设置对应的表单错误', async () => {
		const { result } = renderHook(() => useRequestClient());
		const config = result.current as any;
		const beforeErrorHook = config.hooks.beforeError[0];

		const mockError = {
			response: {
				status: 422,
				clone: () => ({
					json: vi.fn().mockResolvedValue({
						errors: [
							{ field: 'username', message: '用户名必填' },
							{ field: 'password', message: '密码太短' }
						]
					})
				})
			}
		};

		await beforeErrorHook(mockError);

		expect(mockSetFieldError).toHaveBeenCalledWith({
			username: '用户名必填',
			password: '密码太短'
		});
	});

	it('beforeError 钩子在其他状态码且有 message 属性时显示该 message', async () => {
		const { result } = renderHook(() => useRequestClient());
		const config = result.current as any;
		const beforeErrorHook = config.hooks.beforeError[0];

		const mockError = {
			response: {
				status: 500,
				clone: () => ({
					json: vi.fn().mockResolvedValue({
						message: '服务器内部错误'
					})
				})
			}
		};

		await beforeErrorHook(mockError);

		expect(toast.error).toHaveBeenCalledWith('服务器内部错误');
	});

	it('beforeError 钩子在解析后的数据结构不完整时使用兜底请求失败提示', async () => {
		const { result } = renderHook(() => useRequestClient());
		const config = result.current as any;
		const beforeErrorHook = config.hooks.beforeError[0];

		const mockError = {
			response: {
				status: 500,
				clone: () => ({
					json: vi.fn().mockResolvedValue({}) // 没有 message 也没有 errors，会触发 try-catch 的 catch 分支
				})
			}
		};

		await beforeErrorHook(mockError);

		expect(toast.error).toHaveBeenCalledWith('请求失败');
	});
});
