---
title: "malloc 和 new 的区别"
category: cpp
difficulty: medium
order: 5
---

## 参考答案

**结论：** malloc 是函数只分配内存，new 是运算符分配内存**并调用构造函数**。

| 维度 | malloc | new |
|------|--------|-----|
| 本质 | 库函数 | 运算符（可重载） |
| 类型 | 返回 `void*`，需强转 | 返回具体类型指针，**类型安全** |
| 大小 | 需手动 `sizeof` 计算 | 编译器自动算 |
| 构造 | 不调用构造函数 | 调用构造函数 |
| 失败 | 返回 NULL | 抛 `bad_alloc`（nothrow 返回 nullptr） |
| 释放 | `free` | `delete`（数组用 `delete[]`） |

**加分点：** `new[]` 必须配 `delete[]`；`malloc/free` 与 `new/delete` 不能混用。new 底层可能就调用 malloc，但多做了构造/异常处理。
