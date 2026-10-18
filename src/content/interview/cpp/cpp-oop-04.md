---
title: "public / protected / private 区别"
category: cpp
difficulty: easy
order: 20
---

## 参考答案

| 修饰符 | 类内 | 派生类 | 外部 |
|--------|------|--------|------|
| public | ✓ | ✓ | ✓ |
| protected | ✓ | ✓ | ✗ |
| private | ✓ | ✗ | ✗ |

- public 是类的对外接口。
- protected 供派生类扩展使用，同时对外隐藏。
- private 完全封装，派生类也不能直接访问。
