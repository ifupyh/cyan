---
title: "嵌入式系统中轻量级TCP/IP协议栈lwIP的特点"
category: network
difficulty: medium
order: 29
---

## 参考答案

lwIP(lightweight IP)是**嵌入式系统中最常用的轻量级TCP/IP协议栈**。

特点：

- **内存占用小**：十几KB RAM即可运行
- **三种API**：Raw API(回调，零拷贝)、Netconn API、Socket API
- 支持TCP/UDP/ICMP/DHCP/DNS/IGMP等协议
- 可运行在裸机或RTOS上
- 开源免费(BSD许可)

适用场景：MCU级别设备(STM32/ESP32等)的网络通信。

与Linux网络栈比：**功能少但资源占用极小**。
