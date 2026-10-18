---
title: "心跳是什么、怎么实现、为什么不用 HTTP 轮询"
category: ad-machine
difficulty: medium
order: 10
---

## 参考答案

- 心跳：设备定时发"我还活着"，后端超时没收到就判离线、**通知维修**。
- 实现：主进程定时 **MQTT publish 心跳包**（QoS 0，丢了下一拍再来）；连接层 `keepAlive=20s` 自动 PING 保活。
- 不用 HTTP 轮询：轮询要反复建连、开销大、不实时；MQTT 长连接心跳开销小、实时。
