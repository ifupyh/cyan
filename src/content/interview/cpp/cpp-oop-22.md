---
title: "菱形继承的问题及解决"
category: cpp
difficulty: hard
order: 37
---

## 参考答案

**结论：** 菱形继承（B、C 都继承 A，D 继承 B、C）导致 A 的成员在 D 中有**两份**，访问时**二义**。

```cpp
class A { public: int x; };
class B : public A {};
class C : public A {};
class D : public B, public C {};   // D 里有两份 A::x
```

**解决**：让 B、C 用**虚继承** A，保证 D 中只有一份 A 子对象。

```cpp
class B : virtual public A {};
class C : virtual public A {};
```
