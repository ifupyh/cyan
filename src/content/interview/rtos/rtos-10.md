---
title: "FreeRTOS 任务状态及转换"
category: rtos
difficulty: medium
order: 10
---

## 参考答案

**状态**：就绪 Ready、运行 Running、阻塞 Blocked（等延时/资源）、挂起 Suspended、终止 Terminated。

**转换**：
- 就绪 → 运行：调度器选最高优先级就绪任务。
- 运行 → 就绪：时间片用完 / 被更高优先级抢占。
- 运行 → 阻塞：`vTaskDelay`、等信号量/队列。
- 阻塞 → 就绪：延时到 / 资源可用。
- 运行/就绪/阻塞 → 挂起：`vTaskSuspend`；挂起 → 就绪：`vTaskResume`。
- 任意 → 终止：任务函数返回或 `vTaskDelete`。
