---
title: "栈指针有几个？MSP和PSP的区别是什么？FreeRTOS里面用的是什么栈指针？"
category: process-thread
difficulty: medium
order: 20
---

## 参考答案

ARM Cortex-M有两个栈指针：

- **MSP（Main Stack Pointer）**：复位后默认使用，用于**异常和中断处理**
- **PSP（Process Stack Pointer）**：用于**普通任务/线程模式**

**FreeRTOS中**：中断和异常使用MSP，每个任务使用独立的PSP（指向各自任务栈）。任务切换时PendSV保存当前PSP，恢复下一个任务的PSP。

好处：中断使用独立MSP栈不占用任务栈，每个任务PSP栈互不干扰。
