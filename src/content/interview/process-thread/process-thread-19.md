---
title: "实时信号和普通信号有什么区别？如何尽量避免信号丢失？"
category: process-thread
difficulty: medium
order: 19
---

## 参考答案

**实时信号 vs 普通信号**：

- 普通信号（1-31）：不排队，同一信号多次发送只记录一次，可能丢失
- 实时信号（34-64）：**支持排队**，可以携带附加数据（`sigval`），不会丢失

**避免信号丢失的方法**：

- 使用实时信号（`SIGRTMIN` ~ `SIGRTMAX`），它们会排队
- 用 `sigaction()` 代替 `signal()`，行为更可控
- 用 `sigprocmask()` 在处理关键操作时屏蔽信号
- 尽量用其他 IPC 机制（如 pipe、eventfd）代替信号进行通信
