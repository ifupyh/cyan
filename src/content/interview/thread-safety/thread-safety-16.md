---
title: "什么是std::atomic？支持哪些操作？"
category: thread-safety
difficulty: medium
order: 16
---

## 参考答案

`std::atomic`提供**无锁的原子操作**。

支持的操作：

- `load()`/`store()`：原子读/写
- `fetch_add()`/`fetch_sub()`：原子加减
- `compare_exchange_strong()`/`compare_exchange_weak()`：CAS操作
- `exchange()`：原子交换

支持类型：整型、指针、bool等。

```
std::atomic<int> counter(0);
counter.fetch_add(1, std::memory_order_relaxed);
```

与mutex比较：**atomic适合简单操作(计数/标志)，复杂操作还是要用mutex**。
