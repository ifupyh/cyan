---
title: "设备端的架构（四进程）"
category: ad-machine
difficulty: medium
order: 3
---

## 参考答案

- **配置进程**：本地 web 配置页，配网络/后端/MQTT，写 ini，联网，通知主进程。
- **主进程**：向云端注册设备、心跳保活。
- **QT 播放进程**：订阅 MQTT 命令和播放列表，下载素材存 sqlite，分屏播放，执行指令。
- **更新进程**：OTA 升级（定时 + 云端指令）。
