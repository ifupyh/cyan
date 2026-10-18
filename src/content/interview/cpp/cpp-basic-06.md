---
title: "const 和宏的区别"
category: cpp
difficulty: easy
order: 6
---

## 参考答案

**结论：** const 是类型安全的「只读变量」，宏是无类型的「文本替换」。

1. const 有类型、编译器检查；宏无类型。
2. const 遵循作用域/生命周期；宏从定义到文件尾或 `#undef`。
3. const 可能占内存、进符号表、可调试；宏不占、不可调试。
