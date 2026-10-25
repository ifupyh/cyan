---
title: "什么是无锁编程？CAS操作的原理？"
category: thread-safety
difficulty: hard
order: 17
---

## 参考答案

**无锁编程**是不使用传统锁，通过原子操作实现并发安全。

**CAS(Compare-And-Swap)**操作：

- `CAS(addr, expected, new)`：如果addr的值等于expected，则替换为new，返回true；否则返回false
- 硬件级原子操作(ARM: LDREX/STREX, x86: CMPXCHG)

无锁数据结构：

- 无锁队列(Michael-Scott Queue)
- 无锁栈
- 无锁链表

优势：无死锁、高并发性能 缺点：实现复杂、可能有ABA问题、不保证公平

一句话：**用原子操作代替锁，难写但性能好**。
