---
title: "Qt 信号槽"
category: ad-machine
difficulty: easy
order: 19
---

## 参考答案

- 类型安全回调：`connect(sender, signal, receiver, slot)` 建立关联，`emit` 触发。
- 特点：**松耦合**（发送者不关心接收者）、一对多、支持**跨线程**（队列连接）。
