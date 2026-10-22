---
title: "什么是心跳？有什么用？如何实现？"
category: ad-machine-full
difficulty: easy
order: 31
---

## 参考答案

- 心跳：设备定时向云端发一个"我还活着"的信号。
- 作用：后端据此判断设备在线；超时没收到就判定离线，**通知维修人员**。
- 实现：主进程定时通过 **MQTT publish 心跳消息**（含设备 SN、状态等，QoS 0）；MQTT 连接层 `keepAliveInterval=20s`，20 秒无数据自动发 PINGREQ 保链路。
