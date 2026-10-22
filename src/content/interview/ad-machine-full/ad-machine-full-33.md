---
title: "心跳为什么要用 MQTT？"
category: ad-machine-full
difficulty: medium
order: 33
---

## 参考答案

- 设备本来就和 MQTT broker 保持长连接，**复用这条连接发心跳零额外成本**；统一走 MQTT 后端处理一致。
- HTTP 心跳要反复建连/开销大/不实时。
