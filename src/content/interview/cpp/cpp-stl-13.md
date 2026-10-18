---
title: "什么是函数对象"
category: cpp
difficulty: medium
order: 55
---

## 参考答案

**结论：** 重载了 `operator()` 的对象，可像函数一样调用，且能保存状态。

```cpp
struct Adder {
    int n;
    int operator()(int x) const { return x + n; }
};
Adder add5{5};
add5(10);   // 15
```

相比普通函数/函数指针：函数对象是对象，能携带成员状态、能被构造参数初始化、可被内联（性能好）。
