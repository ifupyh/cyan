---
title: "客户端 ID / 设备 SN 从哪来？"
category: ad-machine-full
difficulty: hard
order: 61
---

## 参考答案

- clientId 用设备唯一 **SN**（保证全局唯一）。
- SN 从设备**硬件唯一标识读取**（出厂序列号/烧录），读不到用 **MAC 地址兜底**。
- 直接用 SN 作 clientId，天然唯一，无需额外前缀。

---

## 七、更新进程 / OTA
