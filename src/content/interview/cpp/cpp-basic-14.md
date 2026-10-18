---
title: "sizeof 和 strlen 的区别"
category: cpp
difficulty: easy
order: 14
---

## 参考答案

1. `sizeof` 是运算符，`strlen` 是库函数。
2. `sizeof` 参数可是类型或变量，`strlen` 只能是 `\0` 结尾字符串。
3. `sizeof` **编译期**得出内存大小，`strlen` **运行期**得出字符数（不含 `\0`）。
4. 数组作 `sizeof` 参数**不退化**，传 `strlen` 退化为指针。
