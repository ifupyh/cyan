---
title: "FreeRTOS 中断机制与现场恢复"
category: rtos
difficulty: hard
order: 16
---

## 参考答案

**结论：** 中断现场由**硬件自动压栈**（R0-R3、R12、LR、PC、xPSR）+ 软件配合保存，任务切换经 **PendSV** 完成。

- 进入中断：硬件自动保存上下文到栈。
- 返回时若需任务切换：设置 PendSV（最低优先级中断），中断返回后执行 PendSV，保存当前任务现场、加载新任务现场，实现切换。
- 中断中尽量短、不调会阻塞的 API（用 `...FromISR` 版本，`portYIELD_FROM_ISR` 触发切换）。
