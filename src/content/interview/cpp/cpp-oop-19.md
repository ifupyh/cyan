---
title: "继承方式有哪些"
category: cpp
difficulty: easy
order: 34
---

## 参考答案

| 继承方式 | 基类 public | 基类 protected | 基类 private |
|---------|------------|----------------|--------------|
| public 继承 | public | protected | 不可见 |
| protected 继承 | protected | protected | 不可见 |
| private 继承 | private | private | 不可见 |

**结论：** 继承方式「封顶」了基类成员在派生类中的访问级别，基类 private 成员任何继承方式都不可直接访问。
