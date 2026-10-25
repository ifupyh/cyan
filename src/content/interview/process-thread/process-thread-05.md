---
title: "Linux 多线程程序中常见的互斥问题如何解决？"
category: process-thread
difficulty: medium
order: 5
---

## 参考答案

Linux 多线程**互斥问题**的解决方案：

- **互斥锁（pthread_mutex）**：最常用，保护临界区
- **读写锁（pthread_rwlock）**：读多写少场景，多读可以并行
- **自旋锁（pthread_spinlock）**：临界区极短时使用，避免上下文切换开销
- **条件变量（pthread_cond）**：配合 mutex 实现等待/通知模式
- **原子操作（_\*atomic\**）**：简单的计数器、标志位操作

使用原则：**锁粒度要小**、**持锁时间要短**、**加锁顺序要统一**（防死锁）。
