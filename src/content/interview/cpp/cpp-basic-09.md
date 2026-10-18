---
title: "C++ 的四种类型转换"
category: cpp
difficulty: medium
order: 9
---

## 参考答案

**结论：** 用命名的 cast 替代 C 风格强转，更安全、意图更明确、便于检索。

1. **`static_cast`**：编译期、相关类型之间的转换。用于：基本类型转换、上行转换（子类→基类）、`void*` 转具体类型。**不做运行时检查**。
2. **`dynamic_cast`**：运行期、用于**多态类型**的**下行转换**（基类指针/引用→子类）。会做运行时类型检查：失败时指针返回 nullptr、引用抛 `bad_cast`。要求基类有虚函数。
3. **`const_cast`**：**只**用于添加/移除 const 或 volatile 限定。用于「原本不是 const 的对象被 const 引用传递后恢复修改」等。
4. **`reinterpret_cast`**：最危险，底层二进制位的重新解释，如指针↔整数、无关类型指针互转。几乎不保证可移植。

**加分点：** `dynamic_cast` 依赖 RTTI；`const_cast` 去除 const 后若对象本身真的是 const 再修改是 UB。
