---
title: "多线程环境下如何安全地使用全局变量？"
category: thread-safety
difficulty: easy
order: 26
---

## 参考答案

多线程环境安全使用全局变量的方法：

- **加锁保护**：mutex/spinlock保护读写操作
- **使用atomic类型**：`std::atomic<int>`，适合简单类型
- **读写锁**：读多写少时用rwlock提高并发
- **thread_local**：每个线程一份副本，完全无竞争
- **不可变对象**：const修饰，只读不写就没有竞争
- **无锁数据结构**：CAS操作替代锁

最佳实践：

- **尽量避免全局变量**
- 必须用时优先考虑thread_local或atomic
- 复杂数据用mutex保护
