---
title: "explicit 关键字的作用"
category: cpp
difficulty: medium
order: 26
---

## 参考答案

**结论：** 禁止单参数构造函数和转换运算符的**隐式转换**。

```cpp
class Time {
public:
    explicit Time(int seconds);   // 加 explicit
};
Time t = 5;       // 错误：禁止隐式转换
Time t2(5);       // 正确：显式
```

**加分点：** 不加 explicit 时 `Time t = 5;`、`func(5)` 会悄悄把 int 转成 Time，易产生隐蔽 bug。
