---
title: "FreeRTOS 调度方式与流程"
category: rtos
difficulty: hard
order: 11
---

## 参考答案

- **默认调度**：**抢占式 + 同优先级时间片轮转**。
- **流程**：就绪队列按优先级组织 → 调度器选最高优先级任务运行 → 滴答中断（SysTick）触发调度检查 → 需要切换时经 PendSV 做上下文切换（保存现场、恢复新任务现场）。
