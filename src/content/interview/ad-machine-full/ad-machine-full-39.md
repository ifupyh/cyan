---
title: "项目中哪些地方用到 MQTT？为什么用 MQTT？"
category: ad-machine-full
difficulty: medium
order: 39
---

## 参考答案

- 用到的地方：**命令下发、播放列表推送、心跳上报**。
- 为什么：后端要**主动推**命令和列表给设备、要实时双向通信，MQTT 发布订阅 + 长连接天然契合；HTTP 只能设备主动拉。
