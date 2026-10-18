---
title: "MODBUS"
category: communication
difficulty: medium
order: 6
---

## 参考答案

**结论：** 应用层协议，常用 RS485 承载，主从架构（一主多从），用于工业设备通信。

- **RTU 模式**：二进制帧（地址 + 功能码 + 数据 + CRC 校验），常用于串口/485。
- **TCP 模式**：MBAP 头 + 数据，用于以太网。
- 功能码：读线圈/读保持寄存器/写寄存器等。
