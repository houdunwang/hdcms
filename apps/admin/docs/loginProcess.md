# 微信扫码登录（loginProcess）

本使用文档面向前端开发者，介绍如何接入微信扫码登录流程。无需了解后端源码，只需按照以下接口与流程进行集成。

## 功能概述
- 生成微信二维码供用户扫码
- 用户扫码并确认后，后端把临时票据 `ticket` 与用户身份关联
- 前端使用 `ticket` 轮询登录接口，获取 `token` 与用户信息

## 接入流程
1. 生成二维码
2. 展示二维码并开始轮询
3. 用户扫码确认
4. 使用 `ticket` 换取登录凭证
5. 保存 `token`，完成登录

## 接口说明
### 1) 生成微信二维码
- 路径：`POST /core/wechat/createQr`
- 入参（Body）：
  - `scene_str`：字符串，场景标识，例如 `"login"`（用于区分不同业务场景）
- 返回示例：
```json
{
  "ticket": "string",
  "expire_seconds": 600,
  "url": "string"
}
```
- 前端处理：
  - 使用返回的 `ticket` 开始轮询登录接口
  - 将返回的二维码内容（服务端可能返回的是可用于生成二维码的参数或地址）展示给用户

### 2) 使用 Ticket 登录
- 路径：`POST /core/wechat/login`
- 入参（Body）：
  - `ticket`：第一步生成二维码时返回的临时票据
- 返回示例（成功）：
```json
{
  "token": "string",
  "user": { /* 用户信息 */ }
}
```
- 返回示例（未完成扫码或未确认时）：
```json
{
  "token": null,
  "user": null
}
```
- 前端处理：
  - 轮询调用该接口（建议 1-2 秒一次）
  - 一旦返回包含 `token` 与 `user`，即表示登录成功，停止轮询
  - 将 `token` 保存到本地（如 `localStorage`）用于后续认证

## 前端示例（React + TanStack Query）
以下示例演示生成二维码与轮询登录的典型用法。

```tsx
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

// 生成二维码
const createQr = async (scene_str: string) => {
  const res = await fetch('/core/wechat/createQr', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scene_str }),
  })
  if (!res.ok) throw new Error('生成二维码失败')
  return res.json()
}

// 使用 ticket 登录
const loginWithTicket = async (ticket: string) => {
  const res = await fetch('/core/wechat/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ticket }),
  })
  if (!res.ok) throw new Error('登录接口调用失败')
  return res.json()
}

export function WechatScanLogin() {
  const [qr, setQr] = useState<{ ticket: string; expire_seconds: number; url: string } | null>(null)
  const pollTimerRef = useRef<number | null>(null)

  const createQrMutation = useMutation({
    mutationFn: (scene: string) => createQr(scene),
    onSuccess: (data) => {
      setQr(data)
      // 开始轮询登录
      startPolling(data.ticket)
    },
  })

  const startPolling = (ticket: string) => {
    stopPolling()
    pollTimerRef.current = window.setInterval(async () => {
      try {
        const data = await loginWithTicket(ticket)
        if (data?.token && data?.user) {
          // 登录成功
          localStorage.setItem('token', data.token)
          stopPolling()
        }
      } catch (e) {
        // 可根据需要处理调用失败（例如网络断开）
      }
    }, 1500)
  }

  const stopPolling = () => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current)
      pollTimerRef.current = null
    }
  }

  useEffect(() => {
    // 页面加载后生成二维码
    createQrMutation.mutate('login')
    return () => stopPolling()
  }, [])

  return (
    <div>
      <h3>微信扫码登录</h3>
      {/* 按需展示二维码内容。例如将 url 转为二维码图片 */}
      {qr ? <p>二维码地址：{qr.url}</p> : <p>正在生成二维码...</p>}
    </div>
  )
}
```

## 注意事项
- 二维码及 `ticket` 有时效性，示例中 `expire_seconds` 常见为 600 秒（10 分钟）
- 轮询频率建议控制在 1-2 秒以平衡体验与服务压力
- 登录成功后务必停止轮询并妥善保存 `token`
- 若业务需要区分不同扫码场景，可通过 `scene_str` 进行标识

