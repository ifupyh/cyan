---
title: "FreeRTOS 中的任务栈是什么？它如何初始化？"
category: rtos
difficulty: hard
order: 25
---

## 参考答案

FreeRTOS 的**任务栈**是每个任务独立的内存区域，用于保存局部变量、函数调用链和上下文。

初始化过程：

1. 创建任务时分配栈空间（`xTaskCreate` 动态分配或 `xTaskCreateStatic` 使用用户提供的数组）
2. 内核调用 `pxPortInitialiseStack()` **模拟**一次中断返回的栈帧：在栈顶放入初始的 PC（任务函数入口）、LR、xPSR、R0~R3、R4~R11 等寄存器值
3. 第一次被调度到时，通过异常返回机制**恢复这些初始值**到寄存器，CPU 就跳转到任务函数开始执行

栈大小建议：通过 `uxTaskGetStackHighWaterMark()` 检查栈使用峰值，留出 **20%~30% 余量**防止溢出。
