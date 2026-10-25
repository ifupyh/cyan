---
title: "生产者-消费者问题如何用信号量解决？请描述完整的PV操作流程，以及可能出现的问题。"
category: process-thread
difficulty: hard
order: 7
---

## 参考答案

用**三个信号量**解决：

- `mutex`（初值1）：互斥访问缓冲区
- `empty`（初值N）：表示空闲缓冲区数量
- `full`（初值0）：表示已有数据的缓冲区数量

**生产者**：`P(empty)` → `P(mutex)` → 放数据 → `V(mutex)` → `V(full)`

**消费者**：`P(full)` → `P(mutex)` → 取数据 → `V(mutex)` → `V(empty)`

关键注意：**P操作的顺序不能反**。如果先 `P(mutex)` 再 `P(empty)`，当缓冲区满时生产者持有mutex后阻塞在empty上，消费者又无法获取mutex→**死锁**。

所以必须**先P资源信号量，再P互斥信号量**。
