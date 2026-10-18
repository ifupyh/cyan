---
title: "栈和队列如何遍历"
category: cpp
difficulty: easy
order: 51
---

## 参考答案

- 栈和队列是**受限**结构，只暴露一端/两端，**不能像 vector 一样随机遍历**。
- 只能按规则逐个取出：栈不断 `pop`（后进先出），队列不断 `dequeue`（先进先出）。
- C++ 的 `std::stack`/`std::queue` 是容器适配器，默认封住接口，不提供迭代器；需要遍历时换底层容器（如 deque）。
