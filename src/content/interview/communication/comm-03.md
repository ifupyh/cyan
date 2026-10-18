---
title: "I²C 时序"
category: communication
difficulty: medium
order: 3
---

## 参考答案

**关键要素**：
- **起始条件 S**：SCL 高电平时 SDA 由高→低。
- **停止条件 P**：SCL 高电平时 SDA 由低→高。
- **数据有效性**：SCL 高电平期间 SDA 保持稳定（数据位）；SCL 低电平时 SDA 才允许变化。
- **应答 ACK/NACK**：每传 8 位，第 9 个时钟由接收方拉低 SDA 表示 ACK。
- **重复起始 Sr**：不发停止就重新开始，用于切换读写/从设备。

**流程**：主机发起始 → 发 7 位从机地址+读写位 → 从机 ACK → 传数据（每字节一 ACK）→ 停止。
