---
title: "为什么用多进程"
category: ad-machine
difficulty: medium
order: 5
---

## 参考答案

- **故障隔离**：一个进程崩了不影响其他（播放崩了心跳还能报，后端仍知道设备活着）。
- **技术栈不同**：配置进程纯 C(mongoose)，播放进程 C++/Qt。
- **可单独重启恢复**：崩了单独拉起，多线程只能整体重启。
