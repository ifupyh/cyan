---
title: "MQTT 用在哪些地方 + 为什么不用 HTTP"
category: ad-machine
difficulty: medium
order: 16
---

## 参考答案

- 用在哪：**命令下发、播放列表推送、心跳上报**。
- 为什么不用 HTTP：后端要**主动推**命令和列表、要实时双向；HTTP 只能设备主动拉、开销大。MQTT 发布订阅 + 长连接天然契合。
