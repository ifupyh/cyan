---
title: "常见外设协议（总览）"
category: communication
difficulty: medium
order: 1
---

## 参考答案

| 协议 | 方式 | 线数 | 特点 | 典型应用 |
|------|------|------|------|---------|
| UART | 异步 | 2（TX/RX） | 靠波特率同步，无时钟 | 串口调试、传感器、PC 通信 |
| SPI | 同步全双工 | 4（SCLK/MOSI/MISO/SS） | 高速（几十 MHz）、主从 | Flash、ADC/DAC、SD 卡 |
| I²C | 同步半双工 | 2（SDA/SCL） | 多主多从、带仲裁、低速 | EEPROM、传感器、LCD |
| CAN | 差分总线 | 2（CANH/CANL） | 高可靠、多主、仲裁 | 汽车、工业控制 |
| RS485 | 差分 | 2 | 长距离、多节点 | 工业总线（Modbus） |
| USB | 高速串行 | 4 | 热插拔、分速 | 外设、虚拟串口 |
| Ethernet | 网络 | — | MAC+PHY | 联网、工业以太网 |

**补充**：USART 是 UART 的超集，多了同步模式、硬件流控；SDIO 用于 SD 卡；ADC/DAC/PWM 是模拟/电源类外设。
