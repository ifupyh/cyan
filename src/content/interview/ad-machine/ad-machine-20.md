---
title: "C++ 基础三连（虚函数 / 重载重写 / new malloc）"
category: ad-machine
difficulty: medium
order: 20
---

## 参考答案

- **虚函数 vs 纯虚函数**：虚函数基类有默认实现可重写；纯虚函数 `=0` 无实现，类变抽象类不能实例化，派生类必须实现。
- **重载 vs 重写**：重载 = 同作用域同名**不同参数**（编译期）；重写 = 派生类覆盖基类虚函数**同签名**（运行时多态）。
- **new vs malloc**：new 是运算符、调构造函数、返回类型安全指针、失败抛异常；malloc 是函数、不调构造、返回 `void*`、失败返回 NULL。配对 delete / free。
