---
title: "配置为什么要存入本地文件（ini）？"
category: ad-machine-full
difficulty: medium
order: 24
---

## 参考答案

- 配置是少量键值对，ini **简单、人类可读、启动早期就能读**，不依赖数据库/网络。
- 进程重启后从 ini 读配置恢复运行。
