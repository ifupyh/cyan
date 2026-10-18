---
title: "进程间通信（IPC）"
category: ad-machine
difficulty: medium
order: 6
---

## 参考答案

- 方式：管道、消息队列、共享内存、socket。
- 本项目选 **System V 消息队列**（配置进程 → 主进程）。
- 原因：**有消息边界**、**可按类型收**、**内核维护不用自己加锁**；比 socket 轻，比共享内存简单。
