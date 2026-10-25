---
title: "spinlock和mutex的区别，使用场景？中断上下文为什么不能用信号量？"
category: thread-safety
difficulty: medium
order: 3
---

## 参考答案

spinlock和mutex的核心区别：

- **spinlock**：忙等待(自旋)，**不能睡眠**
  - 适合：短临界区、中断上下文
  - 开销：持锁时间长会浪费CPU
- **mutex**：获取不到就睡眠，**可以睡眠**
  - 适合：长临界区、进程上下文
  - 开销：上下文切换

**中断上下文为什么不能用信号量/mutex**：

- 信号量/mutex获取失败会睡眠
- 中断上下文**不能睡眠**(没有进程上下文可调度)
- 睡眠意味着schedule()，但中断没有task_struct

一句话：**中断里只能用spinlock**
