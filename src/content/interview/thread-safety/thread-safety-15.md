---
title: "原子操作（atomic_t）的常见使用场景"
category: thread-safety
difficulty: easy
order: 15
---

## 参考答案

`atomic_t`原子操作的常见使用场景：

- **引用计数**：`atomic_inc()`/`atomic_dec_and_test()`，对象生命周期管理
- **标志位**：`atomic_set()`/`atomic_read()`，状态标记
- **统计计数**：中断次数、包计数等
- **自旋锁实现**：底层用atomic实现

常用API：

- `atomic_set(v, i)`：设置值
- `atomic_add(i, v)`：加
- `atomic_inc(v)`：加1
- `atomic_cmpxchg(v, old, new)`：比较交换(CAS)

优势：**比锁轻量，适合简单的计数和标志操作**。
