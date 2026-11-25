---
title: "FreeRTOS 中如何创建任务？xTaskCreate() 需要传递哪些参数？"
category: rtos
difficulty: easy
order: 24
---

## 参考答案

使用 `xTaskCreate()` 创建任务，参数包括：任务函数指针、任务名（调试用）、栈大小（单位：字）、传给任务的参数、优先级、任务句柄。

任务函数不能返回，必须有无限循环或调用 `vTaskDelete(NULL)` 删除自己。栈大小要根据局部变量和调用深度合理设置。
