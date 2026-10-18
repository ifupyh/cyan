---
title: "什么是友元"
category: cpp
difficulty: easy
order: 28
---

## 参考答案

**结论：** 用 `friend` 声明，允许**非成员函数、别的类或别的类的成员函数**访问本类的 private/protected 成员。

```cpp
class A {
    friend void print(const A&);   // 友元函数
    friend class B;                // 友元类
private:
    int x_;
};
```

**注意事项**：友元破坏封装，应**最小化**使用；先考虑调整设计或提供公有接口，确实需要再上友元。
