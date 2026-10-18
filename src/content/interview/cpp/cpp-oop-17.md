---
title: "重载 ++/-- 如何区分前置和后置"
category: cpp
difficulty: medium
order: 32
---

## 参考答案

```cpp
MyClass& operator++();    // 前置：返回自增后的引用
MyClass  operator++(int); // 后置：多一个 int 哑参数，返回旧值（按值）
```

- 前置无参（或只有隐含 this），返回 `*this` 的引用。
- 后置多一个 `int` 占位参数，返回修改前的副本。
