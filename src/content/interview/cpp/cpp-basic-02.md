---
title: "什么是命名空间，为什么要用"
category: cpp
difficulty: easy
order: 2
---

## 参考答案

**结论：** 命名空间把相关的标识符（变量、函数、类）组织进一个逻辑作用域，避免命名冲突。

```cpp
namespace A { int x; void f(); }
namespace B { int x; }
A::x; B::x;      // 同名不冲突
using namespace std;  // 引入标准库命名空间
```

**加分点：** 大型项目或多库集成时，全局命名冲突几乎是必然的，命名空间是最基础的解耦手段；匿名命名空间可实现类似 static 的内部链接效果。
