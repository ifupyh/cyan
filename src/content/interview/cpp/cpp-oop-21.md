---
title: "继承中的同名成员如何处理"
category: cpp
difficulty: easy
order: 36
---

## 参考答案

**结论：** 派生类同名成员会**隐藏**基类成员，即使参数列表不同也隐藏。

```cpp
class Base { public: void show() {} };
class Derived : public Base { public: void show(int) {} };  // 隐藏 Base::show()
Derived d;
d.show(1);              // OK
d.Base::show();         // 用作用域限定显式调用基类版本
```
