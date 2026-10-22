---
title: "怎么把广告下发给指定区域/片区的广告机？"
category: ad-machine-full
difficulty: medium
order: 7
---

## 参考答案

- 靠 **MQTT 主题分区**：主题定义为 `ads/adslist/{area}`，`area` 是区域 ID（从配置读取）。
- 设备只订阅自己 `area` 的主题；后端下发时也只发对应 `area` 的主题。
- 结果：同一区域设备收到相同列表，不同区域互不干扰，实现精准分区投放。
