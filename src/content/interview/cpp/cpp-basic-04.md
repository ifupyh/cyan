---
title: "C 和 C++ 的内存分配分别怎么实现"
category: cpp
difficulty: medium
order: 4
---

## 参考答案

- **C**：`malloc/calloc/realloc` + `free`。malloc 计算大小、在空闲块中查找、够大则切分，不够则调 `brk/mmap` 向内核要内存。
- **C++**：`new/delete`。`new` 分两步——先 `operator new` 分配原始内存，再**调用构造函数**；失败抛 `std::bad_alloc` 异常（`nothrow` 版本返回 nullptr）。
