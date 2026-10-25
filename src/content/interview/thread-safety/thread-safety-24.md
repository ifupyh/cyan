---
title: "什么是中断下半部的同步问题？如何处理？"
category: thread-safety
difficulty: hard
order: 24
---

## 参考答案

中断下半部的同步问题：

**问题**：tasklet/softirq和进程上下文可能同时访问共享数据。

**处理方法**：

- 进程与softirq之间：`spin_lock_bh()`(禁止本地软中断+加锁)
- 进程与硬中断之间：`spin_lock_irqsave()`(禁中断+加锁)
- softirq之间(不同CPU)：`spin_lock()`(softirq同类可并行)
- 同一tasklet：不需要锁(同一tasklet不会并行执行)
- workqueue与进程：`mutex`(都在进程上下文)

关键：**根据两个执行路径的上下文类型选择正确的锁变体**
