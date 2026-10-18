---
title: "UART / SPI / RS232 / RS485"
category: communication
difficulty: medium
order: 4
---

## 参考答案

- **UART**：异步串行，靠波特率同步，关键参数波特率/数据位/停止位/校验位。
- **SPI**：同步全双工，4 线主从，靠 CPOL/CPHA 决定采样时机。
- **RS232**：单端电平（±12V），**短距离点对点**。
- **RS485**：差分传输，**抗干扰强、传输远、支持多节点**（半双工，需收发控制），工业主流。
