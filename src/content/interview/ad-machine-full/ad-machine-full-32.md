---
title: "什么是心跳？为什么不用 HTTP 轮询？"
category: ad-machine-full
difficulty: hard
order: 32
---

## 参考答案

- HTTP 轮询：客户端定时发 HTTP 请求问服务器，被动、频繁建连、开销大、不实时。
- MQTT 心跳：**长连接 + 定时心跳包**，服务器实时感知在线、开销小、双向。
- 结论：设备多、要实时感知离线，MQTT 长连接心跳优于 HTTP 轮询。
