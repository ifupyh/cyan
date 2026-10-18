---
title: "MQTT QoS 等级 + 项目怎么用"
category: ad-machine
difficulty: medium
order: 17
---

## 参考答案

- QoS 0（最多一次）、QoS 1（至少一次，回 PUBACK）、QoS 2（恰好一次，开销最大）。
- 项目：**心跳用 QoS 0**（周期上报，丢了再来）；**指令用 QoS 1**（关键动作，保证送到）。
