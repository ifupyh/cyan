---
title: "TCP和UDP各自会出现粘包和拆包吗？为什么？"
category: network
difficulty: medium
order: 10
---

## 参考答案

**TCP会粘包，UDP不会**。原因：

- **TCP是字节流**：没有消息边界，多次send的数据可能被合并或拆分
- **UDP是数据报**：每个sendto对应一个独立报文，recvfrom一次读一个完整包

TCP的拆包：大消息可能被拆成多个TCP段，接收端需自己拼装。

UDP不存在粘包拆包，但**可能丢包和乱序**。

一句话：TCP是水管里的水流(没边界)，UDP是一个个快递包裹(有边界)。
