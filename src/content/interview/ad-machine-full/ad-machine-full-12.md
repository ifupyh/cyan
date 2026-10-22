---
title: "进程间通信方式有哪些？项目选了哪种、为什么？"
category: ad-machine-full
difficulty: medium
order: 12
---

## 参考答案

- 常见 IPC：管道、命名管道 FIFO、**System V 消息队列**、共享内存、信号量、socket。
- 本项目：配置进程 → 主进程用 **System V 消息队列**（封装成公共库 libads_common）。
- 为什么：**有消息边界**（管道/socket 要处理粘包）、**可按类型收**（msgrcv 按类型筛选）、**内核维护无需自己加锁**（共享内存要同步）。
- 对比 socket：本机通信用 socket 偏重（要 IP/端口、协议栈开销），消息队列更轻更简单。
