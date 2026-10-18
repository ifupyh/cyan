---
title: "什么是适配器"
category: cpp
difficulty: medium
order: 56
---

## 参考答案

**结论：** 适配器把已有接口转换成期望的另一种接口。

- STL 中分：**容器适配器**（stack/queue/priority_queue 包装 deque/vector）、**迭代器适配器**（反向迭代器等）、**函数适配器**（bind、not1 等）。
- 核心思想是「不修改原组件，只做一层包装」。
