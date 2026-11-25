---
title: "描述一个你做过的嵌入式项目的整体架构"
category: project-experience
difficulty: hard
order: 3
---

## 参考答案

描述嵌入式项目**整体架构**的参考框架：

分层描述：

- **硬件层**：主控芯片(型号)、外设(传感器/通信模块)、PCB
- **BSP层**：启动代码、驱动(GPIO/UART/SPI/I2C/DMA)
- **OS层**：RTOS选择(FreeRTOS/Linux)及配置
- **中间件层**：协议栈(TCP/IP/MQTT)、文件系统、OTA
- **应用层**：业务逻辑、状态机、用户交互

还要说明：

- 任务划分和优先级
- 关键数据流
- 功耗管理策略

一句话：**从底到上分层说清楚，重点说你负责的部分**。
