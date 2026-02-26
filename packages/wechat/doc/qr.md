
# 二维码模块使用说明

本文档提供如何使用二维码生成模块的说明。

## `createQRCode(params: IWechatQr)`

创建二维码。

- **描述**: 此函数调用微信 API，根据提供的参数创建二维码。它返回 API 响应以及生成的二维码图像的 Data URL。
- **参数**:
  - `params` (`IWechatQr`): 创建二维码的参数。有关详细信息，请参阅 `IWechatQr` 接口。
- **返回**: `Promise<object>` - 一个解析为包含微信 API 响应和 `qrImg` 属性的对象的 Promise，`qrImg` 是二维码图像的 base64 编码 Data URL。

### `IWechatQr` 接口

```typescript
export interface IWechatQr {
	expire_seconds?: number;
	action_name: 'QR_SCENE' | 'QR_STR_SCENE' | 'QR_LIMIT_SCENE' | 'QR_LIMIT_STR_SCENE';
	action_info: {
		scene: {
			scene_id?: number;
			scene_str?: string;
		};
	};
}
```

## `getQrImageByTicket(ticket: string)`

使用 ticket 获取二维码图像。

- **描述**: 此函数通过提供从 `createQRCode` 调用中获得的 ticket 来检索二维码。
- **参数**:
  - `ticket` (`string`): 二维码的 ticket。
- **返回**: `Promise<void>` - API 调用的结果将记录到控制台。请注意，当前实现期望 JSON 响应，这对于图像端点可能不正确。
