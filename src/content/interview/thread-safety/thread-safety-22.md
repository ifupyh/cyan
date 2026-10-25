---
title: "设计一个线程安全的环形缓冲区"
category: thread-safety
difficulty: hard
order: 22
---

## 参考答案

设计线程安全的环形缓冲区要点：

- **数据结构**：buffer数组 + head(写指针) + tail(读指针) + 大小

- **满/空判断**：保留一个空位区分满和空，或用单独的count

- 线程安全

  ：

  - 单生产者单消费者：head和tail各只有一方修改，**无需加锁**(用memory barrier即可)
  - 多生产者多消费者：需要锁或CAS原子操作

- 大小用**2的幂**，取模用位运算(index & (size-1))

关键：**单读单写场景可以做到无锁，这是最优雅的实现**。
