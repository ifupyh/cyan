---
title: "怎么把广告下发给指定区域"
category: ad-machine
difficulty: medium
order: 9
---

## 参考答案

靠 **MQTT 主题分区**：主题 `ads/adslist/{area}`，`area` 是区域 ID。
设备只订阅自己 area 的主题，后端只发对应 area → 精准分区投放。
