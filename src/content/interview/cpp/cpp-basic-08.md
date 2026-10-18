---
title: "什么是函数重载，实现原理"
category: cpp
difficulty: medium
order: 8
---

## 参考答案

**结论：** 同一作用域内，**函数名相同但参数列表不同**（个数/类型/顺序）的多个函数。

```cpp
int add(int, int);
double add(double, double);   // 重载
int add(int);                 // 重载
```

**原理（名字修饰 name mangling）**：编译器把参数类型信息编码进符号名，生成唯一内部名，链接器据此区分不同版本。所以**只有返回类型不同**不能重载（符号名不含返回类型）。
