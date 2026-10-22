---
title: "MQTT 的 clientId 为什么必须唯一？重复了会怎样？"
category: ad-machine-full
difficulty: hard
order: 60
---

## 参考答案

- broker 用 clientId 唯一标识一个连接。
- 重复时：新连接会把旧连接**踢下线（互踢）**，导致设备频繁断线重连、收不到消息。
