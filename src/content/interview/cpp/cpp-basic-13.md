---
title: "智能指针用过吗，怎么用"
category: cpp
difficulty: medium
order: 13
---

## 参考答案

**结论：** 用智能指针做自动内存管理，杜绝手动 new/delete。

- **`unique_ptr`**：独占所有权，不可拷贝只能移动。用于工厂返回值、成员变量。零开销。
- **`shared_ptr`**：共享所有权，引用计数，最后一个销毁时释放对象。用于多模块共享对象。
- **`weak_ptr`**：不增加计数，用于**打破 shared_ptr 循环引用**，用 `lock()` 安全获取。

```cpp
auto p = std::make_unique<Foo>();
auto s = std::make_shared<Foo>();   // 优先 make_shared，一次分配、异常安全
```
