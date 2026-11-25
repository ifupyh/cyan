---
title: "FreeRTOS 的 tickless 模式是什么？它如何实现低功耗？"
category: rtos
difficulty: medium
order: 18
---

## 参考答案

**Tickless 模式**是FreeRTOS低功耗特性。正常SysTick每1ms中断一次，空闲时白白唤醒CPU浪费电。

Tickless原理：所有任务阻塞时，计算下一个唤醒时间，将SysTick**拉长到那个时间点**，CPU进入**低功耗模式（WFI）**。唤醒后**补偿跳过的tick计数**。

配置 `configUSE_TICKLESS_IDLE = 1`。效果：空闲时功耗降低几个数量级，适合电池供电IoT设备。
