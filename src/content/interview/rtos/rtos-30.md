---
title: "vTaskDelay 与 vTaskDelayUntil 有什么区别？"
category: rtos
difficulty: medium
order: 30
---

## 参考答案

`vTaskDelay` 和 `vTaskDelayUntil` 的区别：

- **vTaskDelay(n)**：从调用时刻起延迟 n 个 tick，受任务执行时间影响
  - 实际周期 = 任务执行时间 + n ticks，**周期会漂移**
- **vTaskDelayUntil(&lastWake, n)**：基于**绝对时间**延迟，确保固定周期
  - 自动补偿任务执行时间，**周期精确稳定**

举例：任务执行 2ms，想要 10ms 周期

- `vTaskDelay(10)` → 实际周期 12ms
- `vTaskDelayUntil` → 实际周期精确 10ms

**周期性任务必须用 `vTaskDelayUntil`**。
