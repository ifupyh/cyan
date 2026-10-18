---
title: "const 的使用场景"
category: cpp
difficulty: easy
order: 25
---

## 参考答案

1. **常量变量**：`const int MAX = 100;`
2. **参数**：`void f(const int& x)` 防函数内修改。
3. **返回值**：返回 const 阻止接收方修改。
4. **成员函数**：`int get() const` 保证不修改对象状态（只能调 const 成员）。
5. **指针**：`const char* p`（指向的内容不可改）、`char* const p`（指针本身不可改）、`const char* const p`（都不可改）。
